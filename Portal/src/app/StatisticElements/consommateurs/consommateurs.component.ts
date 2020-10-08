import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StatistiqueModel } from 'src/app/Consommation/Models/statistique-model';
import { TypeModel } from 'src/app/Consommation/Models/type-model';
import { ConsommationService } from 'src/app/Consommation/Services/consommation.service';
import { SecteurHydrauliqueService } from 'src/app/Consommation/Services/secteur-hydraulique.service';

@Component({
  selector: 'app-consommateurs',
  templateUrl: './consommateurs.component.html',
  styleUrls: ['./consommateurs.component.css']
})
export class ConsommateursComponent implements OnInit {
  lineChart:any;
  barChart :any;
  currentAnnee:string;
  currentSecteur:string;
  AnneeDisponibles:Array<string>;
  currentEtage:string;
  listEtage:Array<string>;
  listSecteurHydraulique:Array<string>;
  listConsomAdmins: number[];
  listConsomParticuliers: number[];
  listConsommateurs: number[];
  chartData = [
    { data: [], label: 'Total',fill:false,borderColor:'green' ,borderWidth:1}
  ];
  tableColor=["green","red","blue","yellow","tomato","orange","palegoldenrod","purple"]
  size: number;
  statistiqueTable: StatistiqueModel[];
  //entity = []; so it can be seen in dom
  constructor(private consommationService: ConsommationService, private secteurHydroService: SecteurHydrauliqueService){
    this.currentEtage="Etage";
    this.currentSecteur="Secteur Hydraulique";
    this.currentAnnee="Année";
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
          borderColor:this.tableColor[count],
          borderWidth:1
         
        }
        this.chartData.push(information);
      })
    })
  }
  ngOnInit(){
    this.lineChart = new Chart('lineChart'/*id*/,{//data to control chart
      type:'line'/*type of chart*/,
      data:{
        labels:["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],//data under table
        datasets:this.chartData
      },
      options:{
        title:{//name of chart
          text:"Line Chart",
          display:true //show or not
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
SelectSecteursHydauliques(event){
  let etage=$(event.target).val()
  this.currentEtage = etage.toString();
    this.secteurHydroService.getAllSecteurHydrauliques(this.currentEtage).subscribe((data: string[]) => {
      this.listSecteurHydraulique = data;
    });
}
GetData(){
  var count=0;
  let annee=$("#Year").val();
  let secteur=$("#secteur").val();
  this.currentAnnee = annee.toString();
  this.currentSecteur = secteur.toString();
  this.consommationService.StatistiquesConsommateurs(this.currentEtage,this.currentSecteur,this.currentAnnee).subscribe( (data:Array<StatistiqueModel>)=>{
      this.size=data.length;
      console.log(this.size)
      this.statistiqueTable=data;
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
