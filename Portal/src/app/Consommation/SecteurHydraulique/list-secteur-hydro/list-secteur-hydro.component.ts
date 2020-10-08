import { Component, OnInit } from '@angular/core';
import { SecteurHydrauliqueService } from '../../Services/secteur-hydraulique.service';
import { data } from 'jquery';
import { element } from 'protractor';
import { SecteurHydraulique } from '../../Models/secteur-hydraulique';
import { SecteurCommercialService } from '../../Services/secteur-commercial.service';
import { SecteurCommercial } from '../../Models/secteur-commercial';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-secteur-hydro',
  templateUrl: './list-secteur-hydro.component.html',
  styleUrls: ['./list-secteur-hydro.component.css']
})
export class ListSecteurHydroComponent implements OnInit {
  status:string;
  role:string;
  currentSecteur:string;
  currentEtage:string;
  SecteursHydrauliques:Array<SecteurHydraulique>;
  SecteursCommerciaux:Array<SecteurCommercial>;
  listEtage:Array<String>;
  constructor(private serviceHydro:SecteurHydrauliqueService,
    private router:Router,
    private serviceCom:SecteurCommercialService) {
      this.role=localStorage.getItem("role");
    this.currentEtage="Etage";
    this.currentSecteur="secteur";
    serviceHydro.GetEtages().subscribe((data:Array<String>)=>{
      this.listEtage=data;
    });
   }

  ngOnInit(): void {
  }
  SelectSecHydroPerEtage(){
    this.currentEtage=$("#etage").val().toString();
  this.serviceHydro.GetSecteursHydros(this.currentEtage).subscribe((data:Array<SecteurHydraulique>)=>{
    this.SecteursHydrauliques=data;
  });
  }
  SelectSecteursCom(){
    this.currentSecteur=$("#secteuHydro").val().toString();
    this.serviceCom.GetSecteursCommerciaux(this.currentEtage,this.currentSecteur).subscribe((data:Array<SecteurCommercial>)=>{
      this.SecteursCommerciaux=data;
    });
     this.serviceHydro.GetStatus(this.currentEtage,this.currentSecteur).subscribe((data)=>{
      this.status=data.toString();
    });
  }
  AddSecteurHydraulique(){
    this.router.navigate(["/AjouterSecteurHydraulique"])
  }
  Delete(){
    this.serviceHydro.DeleteSecteurhydraulique(this.currentSecteur);
  }
}
