import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StatistiqueModel } from 'src/app/Consommation/Models/statistique-model';
import { TypeModel } from 'src/app/Consommation/Models/type-model';
import { ConsommationService } from 'src/app/Consommation/Services/consommation.service';
import { SecteurHydrauliqueService } from 'src/app/Consommation/Services/secteur-hydraulique.service';

@Component({
  selector: 'app-consom-etage',
  templateUrl: './consom-etage.component.html',
  styleUrls: ['./consom-etage.component.css']
})
export class ConsomEtageComponent implements OnInit {
  chartData=[{ data: [], label: 'Consommation totale',fill:false,borderColor:'green' ,borderWidth:1},]
  barChart:any;
  currentEtage:string;
  listEtage:Array<string>;
  AnneeDisponibles: string[];
  currentAnnee:string;
  listConsommationEtage:number[];
  statistiqueTable:Array<StatistiqueModel>;
  tableColor=["green","red","blue","yellow","tomato","orange","palegoldenrod","purple"]
  size: number;

  constructor(private consommationService: ConsommationService, private secteurHydroService: SecteurHydrauliqueService) {
    this.currentEtage="Etage";
    this.currentAnnee="Année";
    secteurHydroService.GetEtages().subscribe(result => this.listEtage = result);
    consommationService.GetAnneesDisponibles().subscribe((data: string[]) => {
      this.AnneeDisponibles = data
    })
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
    this.barChart = new Chart('barChart',{
      type:'bar',
      data:{
        labels:["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
  GetDataEtage(){
    let count=0;
    let etage=$("#Etage").val();
    let annee=$("#anneeConsomEtage").val();
    this.consommationService.StatistiqueConsomEtage(etage.toString(),annee.toString()).subscribe( (data:Array<StatistiqueModel>)=>{
      this.statistiqueTable=data
      this.size=data.length;
      this.statistiqueTable.forEach((statistique:StatistiqueModel)=>{
        count++;
        this.newDataPoint(statistique.liststatistiques,statistique.type);
      })
    });

  }
  newDataPoint(dataArr = [100, 100, 100], labeltext="") {
    for(let i=0;i<this.chartData.length;i++){
      if(this.chartData[i].label===labeltext){
        this.chartData[i].data=dataArr;
      }
    }
  
  }
}
