import { Component, OnInit } from '@angular/core';
import { Publico } from '../../models/pub_gral';
import { PublicoService } from '../../services/pub_gral.service';

@Component({
  selector: 'app-publico-general',
  templateUrl: './publico-general.component.html',
  styleUrls: ['./publico-general.component.css']
})
export class PublicoGeneralComponent implements OnInit {
  public publico:Publico;
  public status:String;
  constructor(
    private publicoService:PublicoService
  ) { 
    this.publico = new Publico('',null,'','Si','','','');
  }

  ngOnInit() {
  }

  onSubmit(){
    this.publicoService.register(this.publico).subscribe(
      res =>{
        if(res.publico){
          this.status = 'success';
          this.publico = new Publico('',null,'','Si','','','');
          console.log('Se pudo');
        }else{
          this.status = 'error';
          console.log('No se pudo');
        }
        
        
      },
      err =>{
        console.log(<any>err);
        console.log('No se pudo. Error');
      }
    );
  }

}
