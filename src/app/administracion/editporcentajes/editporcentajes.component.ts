import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Danio } from '../../models/porc_daños';
import { DanioService } from '../../services/porc_daños.service';

@Component({
  selector: 'app-editporcentajes',
  templateUrl: './editporcentajes.component.html',
  styleUrls: ['./editporcentajes.component.css']
})
export class EditporcentajesComponent implements OnInit {
  public danios: Danio[];
  public danio: Danio;
  public status: String;
  constructor(
    private danioService: DanioService,
    private route : ActivatedRoute,
    private router : Router
  ) { 
    this.danio = new Danio('',null,'A');
  }

  ngOnInit() {
    this.getDanio();
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
  }

  getDanio(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];

      this.danioService.getDanio(id).subscribe(
        res=>{
          if(!res.danio){
            this.router.navigate(['/']);
          }else{
            this.danio = res.danio;
          }
        },
        err=>{
          console.log(<any>err);
          this.router.navigate(['/']);
        }
      );
    });
  }

  onSubmit(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];
    this.danioService.editDanio(id,this.danio).subscribe(
      res =>{
        if(res.danio){
            this.status = 'success';
            this.danio = res.danio;
            console.log('se pudo');
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
    });
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
}
