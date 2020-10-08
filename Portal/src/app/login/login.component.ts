import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {LoginService} from './login.service'
import  * as $  from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup=new FormGroup({
    username:new FormControl(),
    password:new FormControl()
  });
  constructor(private loginService: LoginService,router:Router) {
    let role=localStorage.getItem("role");
    if(role!=null){
       router.navigate(["/"+localStorage.getItem("currentPage")]) 
    }
    $("#bodybloc").css(" background:linear-gradient(45deg, rgba(66, 183, 245, 0.8) 0%, rgba(66, 245, 189, 0.4) 100%)")
   }

  ngOnInit(): void {
  }
 
  login(){
    this.loginService.Authentication(this.formGroup.value["username"],this.formGroup.value["password"]);
    console.log(this.formGroup.value["username"]+"et"+this.formGroup.value["password"])
  }
  
}
