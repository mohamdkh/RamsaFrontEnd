import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  * as $  from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  href:string;
  role:string;
  constructor(private router:Router) { 
    
    let url=(location.href).split("/");
    this.href=url[url.length-1];
    localStorage.setItem("currentPage",this.href);
    this.role=localStorage.getItem("role");
    // if(this.role!="admin"){
    //   console.log( $("UploadData"))
    //   $("#UploadData").hide();
    //  // document.getElementById('UploadData').style.display = "block";
    // }
  }

  ngOnInit(): void { (function($) {
    
    
      var fullHeight = function() {
    
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
          $('.js-fullheight').css('height', $(window).height());
        });
    
      };
      fullHeight();
    
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
    
    })(jQuery);
  }
  Deconnecter(){
    localStorage.clear();
    this.router.navigate(['/Login'])
  }

}
