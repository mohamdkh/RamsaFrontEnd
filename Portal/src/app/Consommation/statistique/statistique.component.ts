import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  blocStatistics=["ConsomSecteur","NbreClient","ConsomEtage","ConsomAnnee","ConsomCategorie","RendementSecteur"]
  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: [330, 600, 260, 700,25,61,20,52,14,5,55,81], label: 'Account A' },
    { data: [120, 455, 100, 340,25,61,20,52,14,5,55,81], label: 'Account B' },
    { data: [45, 67, 800, 500 ,25.89,61,20,52,14,5,55,81], label: 'Account C' }
  ];
  Periodes = ["01", "02", "03","04","05","06","07","08","09","10","11","12"];
  constructor() { 
  }

  ngOnInit(): void {
    this.HideAndShowElement("ConsomSecteur");
  }
  SelectStatistique(event){
    let SelectValue=$(event.target).val();
    this.HideAndShowElement(SelectValue.toString());
    console.log($(event.target).val())
  }
  HideAndShowElement(elem:string){
    this.blocStatistics.forEach(item=>{
      if(item==elem){
        $("#"+elem).show();
      }
      else{
        $("#"+item).hide();
      }
    })
  }
}
