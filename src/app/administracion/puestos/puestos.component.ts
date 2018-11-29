import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Puesto } from '../../models/puestos';
import { GLOBAL } from '../../services/global';
import { PuestoService } from '../../services/puestos.service';
import { Http } from '@angular/http';
import { $ } from 'protractor';


@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {
  public puestos : Puesto[];
  public puesto : Puesto;
  public status: String;
  public isEdit: boolean;
  constructor(
    public puestoService:PuestoService
  ) { 
    this.puesto = new Puesto('','A');
    this.isEdit = false;
  }

  ngOnInit() {
    this.puestoService.allpuestos().subscribe(
      res=>{
        if(res.puestos){
          this.puestos = res.puestos;
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

  onSubmit(){
    this.puestoService.register(this.puesto).subscribe(
      res=>{
        if(res.puesto){
          this.status = 'success';
          this.puesto = new Puesto('','A');
          console.log('se pudo');
          this.ngOnInit();
        }else{
          this.status = 'error';
          console.log('No se pudo');
        }
      },
      err=>{
        console.log(<any>err);
        console.log('No se pudo. Error');
      }
    );
  }

  deletePuesto(id){
    this.puestoService.deletePuesto(id).subscribe(
      res=>{
        if(!res.puesto){
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
