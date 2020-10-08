import { Component, OnInit, ɵConsole } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import Swal from 'sweetalert2';
import { ConsommationSectorielle } from '../Models/consommation-sectorielle';
import { SecteurCommercial } from '../Models/secteur-commercial';
import { ConsommationService } from '../Services/consommation.service';
import { SecteurCommercialService } from '../Services/secteur-commercial.service';
import { SecteurHydrauliqueService } from '../Services/secteur-hydraulique.service';

@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrls: ['./consommation.component.css']
})
export class ConsommationComponent implements OnInit {
  currentEtage: string;
  currentAnnee: string;
  currentSecteur: string;
  currentPeriode: string;
  AnneeDisponibles: Array<String>;
  listEtage: Array<string>;
  listSecteurHydraulique: Array<string>;
  SecteurCommerciaux: string;
  SecteurCommerciauxtable: Array<string>;
  secteursCom: SecteurCommercial[];
  ConsommationInfos:Array<ConsommationSectorielle>;
  date: Date;
  constructor(private consommationService: ConsommationService, private secteurHydroService: SecteurHydrauliqueService,
    private secteurComService: SecteurCommercialService) {
    this.currentEtage = "Etage";
    this.currentAnnee = "Annee";
    this.currentPeriode = "Periode";
    this.currentSecteur = "Secteur";
    this.SecteurCommerciaux = "";
    consommationService.GetAnneesDisponibles().subscribe((data: string[]) => {
      this.AnneeDisponibles = data
    }
    );
    secteurHydroService.GetEtages().subscribe(result => this.listEtage = result);

  }

  ngOnInit(): void {
    this.ConsommationInfos=new Array<ConsommationSectorielle>()
    this.currentEtage = "Etage";
    this.currentAnnee = "Annee";
    this.currentPeriode = "Periode";
    this.currentSecteur = "Secteur";
  }
  SelectSecteursHydauliques(event) {
    
    let Annee = $("#annee").val();
    let periode = $("#periode").val();
    this.currentEtage = $(event.target).val().toString();
    if (Annee == null || periode == null) {
      this.secteurHydroService.getAllSecteurHydrauliques(this.currentEtage).subscribe((data: string[]) => {
        this.listSecteurHydraulique = data;
      });
    }
    else {
      this.currentPeriode = $("#periode").val().toString();
      this.currentAnnee = $("#annee").val().toString();
      this.secteurHydroService.getSecteurHydrauliquesActivesApresDate(this.currentEtage, this.currentAnnee, this.currentPeriode)
        .subscribe((data: string[]) => {
          this.listSecteurHydraulique = data;
        });
    }
  }
  Rechercher() {
    let Annee = $("#annee").val();
    let periode = $("#periode").val();
    let etage = $("#etage").val();
    let secteur = $("#secteur").val();
    //Annee==null?Annee="":this.currentAnnee=Annee.toString();
   
    if (Annee == null || periode == null ||etage == null ||secteur == null) {
      Swal.fire({
        title: 'Tous les champs sont obligatoires',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
    else{
      periode=="Toutes"?periode="":this.currentPeriode=periode.toString();
      etage=="Toutes"?etage="":this.currentEtage=etage.toString();
      secteur=="Tous"?secteur="":this.currentSecteur=secteur.toString();
      this.date = new Date();
      this.SecteurCommerciauxtable = new Array<string>();
      this.secteursCom = new Array<SecteurCommercial>();
      this.date.setMonth(parseInt(this.currentPeriode) - 1);
      this.date.setFullYear(parseInt(this.currentAnnee));
      this.secteurComService.GetSecteursCommerciaux(etage.toString(), secteur.toString()).subscribe((data: SecteurCommercial[]) => {
        this.secteursCom = data;
        console.log(this.secteursCom)
        this.secteursCom.forEach(elem => {
          if (elem.dateDesactivation != null) {
            if (elem.dateDesactivation > this.date)
              this.SecteurCommerciauxtable.push(elem.nomSecteurCom);
          }
          else {
            this.SecteurCommerciauxtable.push(elem.nomSecteurCom);
          }
        })
        this.SecteurCommerciaux = this.SecteurCommerciauxtable.join(";")
        this.SecteurCommerciaux = "[" + this.SecteurCommerciaux + "]";
      })
      this.consommationService.GetDATA(Annee.toString(), periode.toString(), etage.toString(), secteur.toString()).subscribe((data:ConsommationSectorielle[])=>{
        this.ConsommationInfos=data;
       });
       if(periode.toString()!="Toutes" && etage.toString()!="Toutes" && secteur.toString()!="Tous"){
         this.consommationService.GetRendement(etage.toString(),secteur.toString(),this.currentAnnee,periode.toString()).subscribe(result=>{
          $("#rendement").text(result+"%");
         })
       }
      }
      
  }
  CalculRendement(event){
    let DebitEntre=parseFloat($(event.target).val().toString());
    let DebitCalcule=this.ConsommationInfos[this.ConsommationInfos.length-1].totalConsom;
    let rendement=((DebitCalcule/DebitEntre)*100).toPrecision(4);

    let periode = $("#periode").val();
    let etage = $("#etage").val();
    let secteur = $("#secteur").val();
    if(periode.toString()!="Toutes" && etage.toString()!="Toutes" && secteur.toString()!="Tous"){
      let role=localStorage.getItem("role");
      let valueAdmin=0;
      if(role=="admin"){
        this.ConsommationInfos.forEach(elem=>{
          if(elem.type==="Les administrations"){
            valueAdmin=elem.totalConsom;
          }
        })
        if(valueAdmin==0){
          Swal.fire({
            title: 'Entrer une consommation estimative des administrations:',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Calculer',
          }).then((data) => {
            let DebitCalculeEstimer=this.ConsommationInfos[this.ConsommationInfos.length-1].totalConsom+parseInt(data.value.toString());
            let rendementEstimer=((DebitCalculeEstimer/DebitEntre)*100).toPrecision(4);
           
            Swal.fire({
              title: 'Voulez-vous enregistrer cette valeur '+rendementEstimer+'% ?',
              showDenyButton: true,
              confirmButtonText: `Enregistrer`,
              denyButtonText: `Annuler`,
            }).then((result) => {
              if (result.isConfirmed) {
               this.consommationService.InsertRendement(etage.toString(),secteur.toString(),this.currentAnnee,periode.toString(),rendementEstimer.toString());
                $("#rendement").text(rendementEstimer+"%");
                Swal.fire("L'enregistrement a été effectué avec succès!", '', 'success')
              } else if (result.isDenied) {
                Swal.fire("L'opération est Annulée", '', 'info')
              }
            })
          })
          //*end
        }
        else{
          Swal.fire({
            title: 'Voulez-vous enregistrer cette valeur '+rendement+'% ?',
            showDenyButton: true,
            confirmButtonText: `Enregistrer`,
            denyButtonText: `Annuler`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.consommationService.InsertRendement(etage.toString(),secteur.toString(),this.currentAnnee,periode.toString(),rendement.toString());
              $("#rendement").text(rendement+"%");
              Swal.fire("L'enregistrement a été effectué avec succès!", '', 'success')
            } else if (result.isDenied) {
              Swal.fire("L'opération est Annulée", '', 'info')
            }
          })
        }
      }
      else{
        $("#rendement").text(rendement+"%");
      }
    }
   
  }

}
