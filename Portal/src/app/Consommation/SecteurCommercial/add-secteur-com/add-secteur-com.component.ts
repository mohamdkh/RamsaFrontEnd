import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SecteurCommercial } from '../../Models/secteur-commercial';
import { SecteurCommercialService } from '../../Services/secteur-commercial.service';
import { SecteurHydrauliqueService } from '../../Services/secteur-hydraulique.service';

@Component({
  selector: 'app-add-secteur-com',
  templateUrl: './add-secteur-com.component.html',
  styleUrls: ['./add-secteur-com.component.css']
})
export class AddSecteurComComponent implements OnInit {
  selectedSecteur:string;
  somme:number;
  listSecteurHydro:Array<String>;
  SecteursIndefinies:Array<String>;
  SecteurData:Array<SecteurCommercial>
  SecteurAdded:SecteurCommercial;
  constructor(private ComService:SecteurCommercialService,private HydroService:SecteurHydrauliqueService,
              private router:Router) {
                let role=localStorage.getItem("role");
                if(role!="admin"){
                  router.navigate(["/Login"])
                }
    this.SecteurData=new Array<SecteurCommercial>();
    HydroService.GetSecteursHydrosActive().subscribe(result=>{
      this.listSecteurHydro=result;
    });
    ComService.GetSecteursIndefinies().subscribe(result=>{
      this.SecteursIndefinies=result
      console.log(result)
      if(this.SecteursIndefinies.length==0){
        this.router.navigate(['/UploadData']); 
      }
    }
      );
   }

  ngOnInit(): void {
    $("#Enregistrer").addClass("blockAction")
  }
  SelectSecteurIndefinie(event:MouseEvent){

    this.SecteurData=new Array<SecteurCommercial>();
    //*Detect selected value and add or remove the color
    $("#Enregistrer").removeClass("blockAction")
    $("#"+this.selectedSecteur).removeClass("btn-warning");
    $("#"+this.selectedSecteur).addClass("btn-danger");
    this.selectedSecteur=$(event.target).html() as string;
    $(event.target).addClass("btn-warning")
    $(event.target).removeClass("btn-danger")
    //*end
    $("#NomSecteurCom").val(this.selectedSecteur);
    this.ComService.GetSecteurComInfos(this.selectedSecteur).subscribe((data:SecteurCommercial[])=>{
      this.SecteurData=data;
      this.CalculerSomme();
    })
  }
  Enregistrer(){
    let taux=$("#TauxAffectHydroToCom").val().toString();
    let tauxAfeectaion=parseFloat(taux)/100.0;
    if(parseInt(taux)>0 && parseInt(taux)<=(100-this.somme*100) && $("#NomSecteurHydro").val()!=null){
      this.SecteurAdded=new SecteurCommercial();
      this.SecteurAdded.nomSecteurCom= this.selectedSecteur;
      this.SecteurAdded.status=$("#NomSecteurHydro").val().toString();
      this.SecteurAdded.tauxAffectHydroToCom=tauxAfeectaion.toString();
      this.ComService.saveSecteurCom(this.SecteurAdded);
      this.SecteurData.push(this.SecteurAdded);
      this.CalculerSomme();
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vérifier votre requête !!',
      })
    }
  }
  CalculerSomme(){
    this.somme=0;
    this.SecteurData.forEach(item=>{
      console.log(parseFloat(item.tauxAffectHydroToCom))
      this.somme=this.somme+ parseFloat(item.tauxAffectHydroToCom);
    })
    if(this.somme<1){
      $("#validerOpp").addClass("blockAction");
      $("#inputNewAffectation").show();
    }
    else if(this.somme==1){
      $("#validerOpp").removeClass("blockAction");
      $("#inputNewAffectation").hide();
    }
    $("#TauxAffectHydroToCom").val((1-this.somme)*100)
  }
  ValiderSecteur(){
    this.ComService.ValiderSecteurCom(this.selectedSecteur);
    for(var i = this.SecteursIndefinies.length - 1; i >= 0; i--) {
      if(this.SecteursIndefinies[i] === this.selectedSecteur) {
        this.SecteursIndefinies.splice(i, 1);
      }
  }
  }
  AnnulerOps(){
    this.ComService.CancelOperation();
  }
}
