import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '@Autowired';
  constructor(private router: Router){
    let element=localStorage.getItem("role");
    if(element==null){
      this.router.navigate(['/Login']); 
    }
    
  }
  diteMoi(){
    let url=window.location.href;
    console.log(url)
  }
}
