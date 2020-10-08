import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StatistiqueModel } from 'src/app/Consommation/Models/statistique-model';
import { ConsommationService } from 'src/app/Consommation/Services/consommation.service';
import { SecteurHydrauliqueService } from 'src/app/Consommation/Services/secteur-hydraulique.service';

@Component({
  selector: 'app-rendement-secteur',
  templateUrl: './rendement-secteur.component.html',
  styleUrls: ['./rendement-secteur.component.css']
})
export class RendementSecteurComponent implements OnInit {

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
    { data: [], label: 'Rendement Sectoriel',fill:false,borderColor:'green' ,borderWidth:1}
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
  }
  ngOnInit(){
    this.lineChart = new Chart('lineChart1'/*id*/,{//data to control chart
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
  let annee=$("#Year1").val();
  let secteur=$("#secteur1").val();
  this.currentAnnee = annee.toString();
  this.currentSecteur = secteur.toString();
  this.consommationService.StatistiquesRendementSectoriel(this.currentEtage,this.currentSecteur,this.currentAnnee)
  .subscribe( (data:Array<number>)=>{
      this.chartData[0].data=data;
    });
}
}
