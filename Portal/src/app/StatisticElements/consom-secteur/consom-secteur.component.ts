import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { error } from 'protractor';
import { StatistiqueModel } from 'src/app/Consommation/Models/statistique-model';
import { TypeModel } from 'src/app/Consommation/Models/type-model';
import { ConsommationService } from 'src/app/Consommation/Services/consommation.service';
import { SecteurHydrauliqueService } from 'src/app/Consommation/Services/secteur-hydraulique.service';

@Component({
  selector: 'app-consom-secteur',
  templateUrl: './consom-secteur.component.html',
  styleUrls: ['./consom-secteur.component.css']
})
export class ConsomSecteurComponent implements OnInit {
  size:number;
  listConsommationsTotales:Array<number>;
  listConsomParticuliers:Array<number>;
  listConsomAdmins:Array<number>;
  listEtage: Array<string>;
  listSecteurHydraulique:Array<string>;
  AnneeDisponibles: Array<String>;
  currentEtage:string;
  currentAnnee:string;
  currentSecteur:string
  statistiqueTable:Array<StatistiqueModel>;
  Nomenclatures:Array<string>
  tableColor=["green","red","blue","yellow","tomato","orange","palegoldenrod","purple"]
  chartOptions = {
    responsive: true
  };
  chartData = [
    {
      data:[],
      label:"Consommation totale"
    }
  ];
  chartLabels = ["01", "02", "03","04","05","06","07","08","09","10","11","12"];
  constructor(private consommationService: ConsommationService, private secteurHydroService: SecteurHydrauliqueService) {
    secteurHydroService.GetEtages().subscribe(result => this.listEtage = result);
    consommationService.GetAnneesDisponibles().subscribe((data: string[]) => {
      this.AnneeDisponibles = data
    }
    );
    
    consommationService.GetTypes().subscribe((data:TypeModel[])=>{
      let count=0;
      data.forEach(elem=>{
        count++;
        var information={
          data:[],
          label:elem.description,
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor:  "#fff",
          pointHoverBackgroundColor:  "#fff",
          pointHoverBorderColor: "rgba(255,99,132,0.8)",
          backgroundColor: this.tableColor[count],
          borderColor: this.tableColor[count]
        }
        this.chartData.push(information);
      })
    })
   }

  ngOnInit(): void {
    this.currentAnnee="Année"
    this.currentEtage="Etage"
    this.currentSecteur="Secteur Hydraulique"
  }
  SelectSecteursHydauliques(event){
     let etage=$(event.target).val()
    this.currentEtage = etage.toString();
      this.secteurHydroService.getAllSecteurHydrauliques(this.currentEtage).subscribe((data: string[]) => {
        this.listSecteurHydraulique = data;
      });
   
  }
  GetData(){
    let count=0;
     this.size=0;
    let annee=$("#annee").val();
    let secteur=$("#secteurHydro").val();
    annee=="Année"?annee="":this.currentAnnee=annee.toString();
    annee=="Année"?annee="":this.currentAnnee=annee.toString();
    this.currentAnnee = annee.toString();
    this.currentSecteur = secteur.toString();
    this.consommationService.StatistiqueConsomSecteur(this.currentEtage,this.currentSecteur,this.currentAnnee).subscribe(
      (data:Array<StatistiqueModel>)=>{
        this.size=data.length;
        this.statistiqueTable=data;
        this.statistiqueTable.forEach((statistique:StatistiqueModel)=>{
          this.newDataPoint(statistique.liststatistiques,statistique.type);
        })
      },
      error=>console.log(error)  
    )
  }
  newDataPoint(dataArr = [100, 100, 100], labeltext="") {
    for(let i=0;i<this.chartData.length;i++){
      if(this.chartData[i].label===labeltext){
        this.chartData[i].data=dataArr;
      }
    }
  }
}
