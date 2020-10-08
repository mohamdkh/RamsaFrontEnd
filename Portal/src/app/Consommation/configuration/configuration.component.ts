import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { TypeModel } from '../Models/type-model';
import { ConsommationService } from '../Services/consommation.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  tabConfig=["inscription","ConfigRelevee"]
  showedElement:string;
  TypeList:Array<TypeModel>;
  constructor(private loginservice:LoginService,private consommationService:ConsommationService) {
    this.showedElement="1";
    this.consommationService.GetTypes().subscribe((res:TypeModel[])=>{
      this.TypeList=res;
    });
   }

  ngOnInit(): void {
  }
  TogleBlocs(event){
   
    this.tabConfig.forEach(element => {
      $("#"+element).removeClass("active");
    });
    $(event.target.parentElement).addClass("active")
    if( $(event.target).text()=="Utilisateur ")
        this.showedElement="1"
    else{
      this.showedElement="2"
    }
    console.log( this.showedElement)
  }
  SaveUser(){
    let username= $("#inputUsername").val()
    let password=$("#inputPassword").val()
    let role=$("#inputRole").val()
    this.loginservice.SaveUser(username.toString(),password.toString(),role.toString());

  }
  SaveType(){
    let id=$("#inputId").val()
    let description=$("#inputdescription").val()
    this.consommationService.saveTypeReleve(id.toString(),description.toString());
  }
  Delete(event:number){
    this.consommationService.DeleteType(event).subscribe(
      resp=>console.log(resp)
    );
  }
}
