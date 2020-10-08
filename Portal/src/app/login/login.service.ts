import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import {SecteurHydraulique} from './../Consommation/Models/secteur-hydraulique'
import { Router } from '@angular/router';
import { LoginModel } from './login-model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:String;
  Elements=["Consommation","SecteurHydraulique","UploadData","Statistiques"]
  constructor(private http: HttpClient
    , private router: Router) {
      this.url=environment.API_URL+"/";
     }


  Authentication(username: String, password: String) {
    this.http.post(this.url+'Login', {
      "username": username,
      "password": password
    }
    ).subscribe(
      (response:LoginModel) => {
        //var responseString=response.toString();
         if(response!=null){
           localStorage.setItem("role",response.roles);
            this.router.navigate(['/Consommation']); 
         }
         else{
          Swal.fire({
            title: 'Erreur !',
            text: "Le compte ou le mot de passe sont incorrects"
          })
         }
        
      },
      (error) => {
        Swal.fire({
          title: 'Erreur !',
          text: "Le compte ou le mot de pass sont incorrect"
        })
      }
    );
  }
  SaveUser(username: string, password: string , role: string ) {
    this.http.post(this.url+"SaveUser",{
      "username":username,
      "password":password,
      "roles":role
    }).subscribe((response:boolean)=>{
      if(!response){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Le compte existe déjà !"
      })
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "l'element a été bien enregistrer",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
