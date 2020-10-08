import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { SecteurCommercial } from '../Models/secteur-commercial';
import { param } from 'jquery';
import { AffectationComToHydro } from '../Models/affectation-com-to-hydro';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SecteurCommercialService {
 url:string;
  constructor(private http: HttpClient
    , private router: Router) {
      this.url=environment.API_URL+"/SecteurCommercial/";
     }
     GetSecteursCommerciaux(etage:string,secteurHydro:string):Observable<SecteurCommercial[]>{
       let fullurl=this.url+'ListSecteursCommerciaux';
      return this.http.get<SecteurCommercial[]>(fullurl,{params:{
        "Etage":etage,
        "Nom":secteurHydro
      }});
    }
    GetSecteurHydraulique(secteurCom:string):Observable<AffectationComToHydro[]>{
      let fullurl=this.url+'ListAffectations';
      console.log(secteurCom)
      return this.http.get<AffectationComToHydro[]>(fullurl,{params:{
        "secteurCom":secteurCom
      }});
    }
    GetStatusCommercial(secteurCom:string){
      return this.http.get(this.url+'StatusCommercial',{params:{
        "secteurCom":secteurCom
      },responseType:"text"});
    }
    DeleteSecteurCom(SecteurCom:string){
      Swal.fire({
        title: 'êtes-vous sûre que vous voulez supprimer le secteur '+SecteurCom+' ?',
        showDenyButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: 'Non',
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.get(this.url+'DesactiverSecteur',{
            params:{
              "secteurCom":SecteurCom
            }
          }).subscribe(response=>{
            console.log(response)
          });
          Swal.fire("Opération s'effectue avec succès", '', 'success').then(result=>{
            window.location.reload();
          });
          //window.location.reload();
        } else if (result.isDenied) {
          Swal.fire("L'opération est annulé", '', 'info')
        }
      })
    }
    GetSecteursIndefinies():Observable<any>{
      return this.http.get(this.url+"SecteurIndefinies");
    }
    GetSecteurComInfos(selectedSecteur:string):Observable<SecteurCommercial[]>{
      return this.http.get<SecteurCommercial[]>(this.url+"GetSecteurComPerNom",{params:{
        "secteurCom":selectedSecteur
      }});
    }
    saveSecteurCom(secteur:SecteurCommercial){
      console.log(secteur)
      this.http.post(this.url+"AddSecteurCom",{
        "status": secteur.status,
        "tauxAffectHydroToCom":parseFloat(secteur.tauxAffectHydroToCom),
        "nomSecteurCom": secteur.nomSecteurCom
      }).subscribe(reslt=>console.log(reslt));
    }
    ValiderSecteurCom(secteurCom:string){
      this.http.get(this.url+"ValiderSecteur",{params:{
        "secteurCom":secteurCom
      }}).subscribe(reult=>{
        console.log(reult)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Le secteur '+secteurCom+'a été bien ajouté',
          showConfirmButton: false,
          timer: 1500
        }) 
      },error=>console.log(error));
    }
    CancelOperation(){
      return this.http.get(this.url+"CancelOperation").subscribe(resp=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "l'opération est annulée",
          showConfirmButton: false,
          timer: 1500
        }).then(result=>{
          window.location.reload();
        }
        
        )  
      });
    }
}
