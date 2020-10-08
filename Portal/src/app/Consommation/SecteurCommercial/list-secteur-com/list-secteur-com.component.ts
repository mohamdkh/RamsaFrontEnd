import { Component, OnInit } from '@angular/core';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { SecteurCommercialService } from '../../Services/secteur-commercial.service';
import { AffectationComToHydro } from '../../Models/affectation-com-to-hydro';

@Component({
  selector: 'app-list-secteur-com',
  templateUrl: './list-secteur-com.component.html',
  styleUrls: ['./list-secteur-com.component.css']
})
export class ListSecteurComComponent implements OnInit {
  Affectations:Array<AffectationComToHydro>;
  secteurCom:string;
  status:String;
  role :string;
  constructor(private service:SecteurCommercialService) {
    this.role=localStorage.getItem("role");
    this.Affectations=new Array<AffectationComToHydro>();
     var url=location.href.toString().split("=")[1];
     this.secteurCom=url.toString();
     service.GetSecteurHydraulique(this.secteurCom).subscribe((data:Array<AffectationComToHydro>)=>{
      this.Affectations=data
     });
     service.GetStatusCommercial(this.secteurCom).subscribe((data)=>{
      this.status=data.toString();
    });
   }
   Delete(){
     this.service.DeleteSecteurCom(this.secteurCom);
    
   }

  ngOnInit(): void {
  }

}
