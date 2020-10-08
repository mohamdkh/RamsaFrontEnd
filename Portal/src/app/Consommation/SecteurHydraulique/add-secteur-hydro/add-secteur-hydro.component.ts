import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SecteurHydrauliqueService } from '../../Services/secteur-hydraulique.service';

@Component({
  selector: 'app-add-secteur-hydro',
  templateUrl: './add-secteur-hydro.component.html',
  styleUrls: ['./add-secteur-hydro.component.css']
})
export class AddSecteurHydroComponent implements OnInit {
  currentEtage:string;
  public formGroup=new FormGroup({
    etage:new FormControl(),
    NomSecteurHydro:new FormControl()
  });
  listEtage:Array<String>;
  constructor(private serviceHydro:SecteurHydrauliqueService, private router:Router) {
    let role=localStorage.getItem("role");
    if(role!="admin"){
      router.navigate(["/Login"])
    }
    this.currentEtage="Etage";
    serviceHydro.GetEtages().subscribe((data:Array<String>)=>{
      this.listEtage=data;
    });
   }

  ngOnInit(): void {
    $("#EntrerEtage").hide();
    $("#SelectEtage").show();
  }
  Enregistrer(){
    this.serviceHydro.AddSecteurHydraulique(this.formGroup.value["etage"],this.formGroup.value["NomSecteurHydro"])
    
    $("#EntrerEtage").hide();
    $("#SelectEtage").show();
  }
  OnselectEtage(){
    if(this.formGroup.value["etage"]=="Autre"){
      $("#SelectEtage").hide();
      $("#EntrerEtage").show();
    }
  }

}
