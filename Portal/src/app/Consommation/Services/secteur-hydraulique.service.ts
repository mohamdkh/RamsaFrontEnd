import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SecteurHydraulique } from '../Models/secteur-hydraulique';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SecteurHydrauliqueService {
  
  
url:String;
  constructor(private http: HttpClient
    , private router: Router) { 
    this.url=environment.API_URL+"/SecteurHydraulique/";
  }
  GetEtages():Observable<any>{
    return  this.http.get(this.url+'ListEtage');
  }
  GetSecteursHydros(etage:string):Observable<SecteurHydraulique[]>{
    return this.http.get<SecteurHydraulique[]>(this.url+'ListSecteursHydrauliques/'+etage);
  }
  AddSecteurHydraulique(etage:string,secteurHydro:string){
    console.log(etage)
    this.http.post(this.url+'AddSecteurHydraulique', {
      "etage": etage,
      "nom": secteurHydro
    },
      { responseType: 'text' }
    ).subscribe(
      (response) => {
        var responseString=response.toString();
        console.log(response)
         if(responseString.length==0){
          Swal.fire({
            icon: 'success',
            title: 'le secteur '+secteurHydro+' a été ajouté avec succès',
            showConfirmButton: false,
            timer: 2000
          }).then(result=>
            window.location.reload()
          )
         }
         else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: responseString
          })
        }
      }
    );
  }
  GetStatus(etage:string,secteur:string){
    return this.http.get(this.url+'StatusHydraulique',{params:{
      "Etage":etage,
      "Nom":secteur
    },responseType:"text"});
  }
  DeleteSecteurhydraulique(SecteurHydraulique:string){
    Swal.fire({
      title: 'êtes-vous sûre que vous voulez supprimer le secteur '+SecteurHydraulique+' ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.get(this.url+'DesactiverSecteur',{
          params:{
            "secteurHydro":SecteurHydraulique
          }
        }).subscribe(response=>{
          console.log(response)
        });
        Swal.fire("Opération a été effectué avec succès", '', 'success').then(result=>{
          window.location.reload();
        });
        //window.location.reload();
      } else if (result.isDenied) {
        Swal.fire("L'opération est annulé", '', 'info')
      }
    })
  }
  GetSecteursHydrosActive():Observable<any> {
    return this.http.get(this.url+"SecteurHydroActive");
  }
  getAllSecteurHydrauliques(Etage:string):Observable<string[]>{
    return this.http.get<string[]>(this.url+"AllSecteurHydroParEtage",{
      params:{
        "etage":Etage
      }
    })
  }
  getSecteurHydrauliquesActivesApresDate(currentEtage: string, currentAnnee: string, currentPeriode: string):Observable<string[]> {
    return this.http.get<string[]>(this.url+"getSecteurHydrauliquesActivesApresDate",{
      params:{
        "etage":currentEtage,
        "annee":currentAnnee,
        "periode":currentPeriode
      }
    })
  }
}
