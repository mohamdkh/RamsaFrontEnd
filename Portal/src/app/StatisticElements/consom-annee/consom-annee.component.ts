import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { empty, EMPTY } from 'rxjs';
import { StatistiqueModel } from 'src/app/Consommation/Models/statistique-model';
import { TypeModel } from 'src/app/Consommation/Models/type-model';
import { ConsommationService } from 'src/app/Consommation/Services/consommation.service';
import { SecteurHydrauliqueService } from 'src/app/Consommation/Services/secteur-hydraulique.service';

@Component({
  selector: 'app-consom-annee',
  templateUrl: './consom-annee.component.html',
  styleUrls: ['./consom-annee.component.css']
})
export class ConsomAnneeComponent implements OnInit {
  listConsommationsTotales:Array<number>;
  listConsomParticuliers:Array<number>;
  listConsomAdmins:Array<number>;
  listEtage: Array<string>;
  listSecteurHydraulique:Array<string>;
  AnneeDisponibles: Array<string>;
  currentEtage:string;
  currentAnnee:string;
  currentSecteur:string
  tableColor=["green","red","blue","yellow","tomato","orange","palegoldenrod","purple"]
  chartOptions = {
    responsive: true
  };
  chartData=[{ data: [], label: 'Consommateurs annuelle Totale',fill:false,borderColor:'red' ,borderWidth:1},]
  backupcharbar=[{ data: [], label: 'Consommateurs annuelle Totale',fill:false,borderColor:'red' ,borderWidth:1},]
  barChart: any;
  statistiqueTable: StatistiqueModel[];
  size: number;
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
          'data':[],
          'label':elem.description,
          fill:false,
          borderColor: this.tableColor[count],
          borderWidth:1
        }
        this.chartData.push(information);
      })
    })
   }

  ngOnInit(): void {
    this.consommationService.GetAnneesDisponibles().subscribe((data: string[]) => {
      this.AnneeDisponibles = data
      this.barChart = new Chart('barChartConsommation',{
        type:'bar',
        data:{
          labels:this.AnneeDisponibles,
          datasets:this.chartData
        },
        options:{
          title:{
            text:"Bar Chart",
            display:true
          },
          scales:{
            yAxes:[{
              ticks:{
                beginAtZero:true
              }
            }]
          }
        }
      });
    }
    );
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
    let secteur=$("#Secteurhydraulique").val();
    this.currentSecteur = secteur.toString();
    this.consommationService.statistiqueAnneeConsomSecteur(this.currentEtage,this.currentSecteur)
    .subscribe((data:StatistiqueModel[])=>{
      this.size=data.length;
      this.statistiqueTable=data;
      this.statistiqueTable.forEach((statistique:StatistiqueModel)=>{
        this.newDataPoint(statistique.liststatistiques,statistique.type);
      })
    });
  }
  newDataPoint(dataArr = [100, 100, 100], labeltext="") {
    console.log(this.chartData.length)
    for(let i=0;i<this.chartData.length;i++){
      if(this.chartData[i].label===labeltext){
        console.log("je rentre avec "+i)
        this.chartData[i].data=dataArr;
      }
    }
  }
}
