import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
 url:string;
  constructor(private http: HttpClient) {
    this.url=environment.API_URL+"/Consommation/";
   }
   UploadFile(formData: FormData){
     return this.http.post<any>(this.url+"UploadData",formData,{
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map(event=>
        this.getEventMessage(event, formData)),
      catchError(this.handleError)
      );
   }
   private handleError(error: HttpErrorResponse) {
     console.log(error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
		break;
      case HttpEventType.Response:
        return this.apiResponse(event);
		break;
      default:
        return `File  surprising upload event: ${event.type}.`;
    }
  }
  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }
}
