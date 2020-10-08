import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ConsommationSectorielle } from '../Models/consommation-sectorielle';
import { StatistiqueModel } from '../Models/statistique-model';
import { TypeModel } from '../Models/type-model';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ConsommationService {
  url:string;
  Results:Array<number>;
  ConsommationAdmin:ConsommationSectorielle
  ConsommationParticulier:ConsommationSectorielle
  constructor(private http: HttpClient) { 
    this.url=environment.API_URL+"/Consommation/"
  }

  GetAnneesDisponibles():Observable<string[]> {
    return this.http.get<string[]>(this.url+"AnneesDisponibles");
  }
  GetDATA( annee:string,periode:string,etage:string,secteur:string):Observable<ConsommationSectorielle[]>{
    
     return this.http.get<ConsommationSectorielle[]>(this.url+"GetConsommationData",{
      params:{
        "periode":periode,
        "annee":annee,
        "etage":etage,
        "secteurHydraulique":secteur
      }
    })
  }
  StatistiqueConsomSecteur(etage:string,secteurHydro:string,annee:string):Observable<StatistiqueModel[]>{
     return this.http.get<StatistiqueModel[]>(this.url + 'statistiqueConsomSecteur', {
      params: {
        "etage": etage,
        "secteurHydro": secteurHydro,
        "annee": annee
      }
    });
  }
  StatistiquesConsommateurs(etage:string,secteur:string,annee:string):Observable<StatistiqueModel[]>{
    return this.http.get<StatistiqueModel[]>(this.url + 'statistiqueConsommateurs', {
      params: {
        "etage": etage,
        "secteurHydro": secteur,
        "annee": annee
      }
    });
  }
  StatistiqueConsomEtage(etage:string,annee:string){
    return this.http.get<StatistiqueModel[]>(this.url + 'statistiqueConsomEtage', {
      params: {
        "etage": etage,
        "annee": annee
      }
    });
  }
  statistiqueAnneeConsomSecteur(etage:string,secteur:string){
    return this.http.get<StatistiqueModel[]>(this.url + 'statistiqueAnneeConsomSecteur', {
      params: {
        "etage": etage,
        "Secteur":secteur
      }
    });
  }
  InsertRendement(currentEtage:string,currentSecteur:string,currentAnnee:string,currentPeriode:string,rendement:string){
    return this.http.post(this.url+"insererRendement",{},{
      params:{
      "etage":currentEtage,
      "secteur":currentSecteur,
      "annee":currentAnnee,
      "periode":currentPeriode,
      "rendement":rendement
    }
    }).subscribe(resp=>{
      console.log(resp)
    },error=>{
      console.log(error)
    })
  }
  GetRendement(currentEtage:string,currentSecteur:string,currentAnnee:string,currentPeriode:string){
    return this.http.get(this.url+"GetRendement",{
      params:{
        "etage":currentEtage,
        "secteur":currentSecteur,
        "annee":currentAnnee,
        "periode":currentPeriode
      }
    })
  }
  GetTypes():Observable<TypeModel[]>{
    return this.http.get<TypeModel[]>(this.url+"GetTypes");
  }
  StatistiquesRendementSectoriel(etage:string,secteur:string,annee:string){
    return this.http.get<number[]>(this.url+"StatistiquesRendementSectoriel",{
      params:{
        "etage":etage,
        "secteur":secteur,
        "annee":annee
      }
    }) 
  }
  saveTypeReleve( id:string, description:string){
    if(isNaN(parseInt(id))){
      console.log("noooo")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "'ID' doit être numérique ?"
      })
    }
    else{
      this.http.post(this.url+"saveTypeReleve",{
        "id_type":parseInt(id),
        "description":description
      }).subscribe((response:boolean)=>{
        if(!response){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "id-type existe déjà !"
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
  DeleteType(event:number){
    return this.http.post(this.url+"DeleteType",{
      "id_type":event
    })
  }
}
