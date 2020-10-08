import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UploadFileService } from '../Services/upload-file.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {
  selectedFile :File;
  erreurs:string;
  fileUpload = {status: '', message: '', filePath: ''};
  constructor(private service:UploadFileService,private router:Router) {
    let role=localStorage.getItem("role");
    if(role!='admin'){
      router.navigate(['/Login']); 
    }
   }
   
  ngOnInit(): void {
    $(".progress").hide();
  }
  ClickInputFile(){
    $('#call-to-action').addClass('upload--loading');
    $('.upload-hidden').click();
  }
  fileUploadBar(){
    $('body').removeClass('file-process-open');
  }
  UploadFile(event){
    Swal.fire({
      title: 'Etes-vous sûre que vous voulez importer ce Fichier ?  ',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedFile=event.target.files[0] as File;
        if(this.selectedFile!=null){
          this.sendFile();
        }
        else{
          $('#call-to-action').removeClass('upload--loading'); 
        }
        $('#call-to-action').removeClass('upload--loading');
        $('body').addClass('file-process-open');
       // console.log(event.target.files[0])
        //this.service.UploadFile(event);
      }
      else if (result.isDenied) {
        Swal.fire("L'opération annulée", '', 'info')
      }
    });
   

  }
  async sendFile() {
    if(this.selectedFile.type=="application/vnd.ms-excel"){
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
     fd.forEach(elem=>{
        console.log(elem.valueOf())
      })
      this.service.UploadFile(fd).subscribe(
       resp=>this.fileUpload=resp,
       err => this.erreurs = err
      );
      // setTimeout(() => 
      // {
      //   this.router.navigate(['/AjouterSecteurCommercial']); 
      // },
      // 6000);
      
    }
    else{
      this.erreurs="Le fichier doit avoir l'extension .csv !"
    }
  }
  ToggleShowExample(){
    $("#DataStructureExample").toggleClass("visibleImg");
  }
}
