import { Component, OnInit } from '@angular/core';
import { Danio } from '../../models/porc_daños';
import { GLOBAL } from '../../services/global';
import { DanioService } from '../../services/porc_daños.service';
import { RetrasoService } from '../../services/porc_retrasos.service';
import { Retraso } from '../../models/porc_retrasos';


@Component({
  selector: 'app-porcentajes',
  templateUrl: './porcentajes.component.html',
  styleUrls: ['./porcentajes.component.css']
})
export class PorcentajesComponent implements OnInit {
  public danios: Danio[];
  public danio: Danio;
  public retraso: Retraso;
  public retrasos: Retraso[];
  public status: String;
  public status2: String;
  public vacio: boolean;
  public id_retraso: String;
  public porcentaje_r: number;
  constructor(
    private danioService : DanioService,
    private retrasoService : RetrasoService
  ) {
    this.danio = new Danio('',null,'A');
    this.retraso = new Retraso('',null);
   }

  ngOnInit() {
    this.danioService.allDanios().subscribe(
      res=>{
        if(res.danios){
          this.danios = res.danios;
        }
      },
      err=>{
        console.log(<any>err);
      }
    );    
    this.retrasoService.allRetraso().subscribe(
      res=>{
        if(res.retraso){
          this.retrasos = res.retraso;
          console.log(this.retrasos.length);
          if(this.retrasos.length == 0){
            this.vacio = true;
            // console.log('Do babes');
          }else{
            this.vacio = false;
            this.id_retraso = this.retrasos[0]._id;
            this.porcentaje_r = this.retrasos[0].porcentaje;
            // console.log('si hay');
            // console.log(this.id_retraso);
          }
        }
      },
      err=>{
        console.log(<any>err);
      }
    );  

  }


onSubmit(){
  this.danioService.register(this.danio).subscribe(
    res =>{
      if(res.danio){
        this.status = 'success';
        this.danio = new Danio('',null,'A');
        console.log('Se pudo');
        this.ngOnInit();
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

onSubmit2(){
  this.retraso = new Retraso('',this.porcentaje_r);
  if(this.vacio){
    this.registerRetraso();
  }else{
    this.updateRetraso();
  }
}

registerRetraso(){
  this.retrasoService.register(this.retraso).subscribe(
    res =>{
      if(res.retraso){
        this.status2 = 'success';
        //this.retraso = new Retraso('',null);
        console.log('Se pudo');
      }else{
        this.status2 = 'error';
      }
      
    },
    err =>{
      console.log(<any>err);
      console.log('No se pudo joder');
    }
  );
}

updateRetraso(){
  this.retrasoService.editRetraso(this.id_retraso,this.porcentaje_r).subscribe(
    res =>{
      if(res.retraso){
        this.status2 = 'success';
        //this.retraso = new Retraso('',null);
        console.log('Se pudo');
      }else{
        this.status2 = 'error';
      }
      
    },
    err =>{
      console.log(<any>err);
      console.log('No se pudo joder');
    }
  );
}


deleteDanio(id){
  this.danioService.deleteDanio(id).subscribe(
    res=>{
      if(!res.danio){
        alert('error');
      }else{
        this.ngOnInit();
      }
    },
    err=>{
      alert('error en el servidor');
    }
  );
}

//   onSubmit(){
//     this.danioService.register(this.danio).subscribe(
//       res =>{
//         //if(res.)
//         console.log('Se pudo');
//       },
//       err =>{
// console.log(<any>err);
// console.log('No se pudo joder');
//       }
//     )
//   }
}
