import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Puesto } from '../../models/puestos';
import { PuestoService } from '../../services/puestos.service';

@Component({
  selector: 'app-editarpuestos',
  templateUrl: '../puestos/puestos.component.html',
  styleUrls: ['./editarpuestos.component.css']
})
export class EditarpuestosComponent implements OnInit {
  public puestos : Puesto[];
  public puesto : Puesto;
  public status: String;
  public isEdit: boolean;
  constructor(
    public puestoService:PuestoService,
    private route : ActivatedRoute,
    private router : Router
  ) {
    this.puesto = new Puesto('','A');
    this.isEdit = true; 
   }

  ngOnInit() {
    this.getPuesto();
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
  getPuesto(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];

      this.puestoService.getPuesto(id).subscribe(
        res=>{
          if(!res.puesto){
            this.router.navigate(['/']);
          }else{
            this.puesto = res.puesto;
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
      this.puestoService.editPuesto(id, this.puesto).subscribe(
        res=>{
          if(res.puesto){
            this.status = 'success';
            this.puesto = res.puesto;
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
   });
  
  }

  
}
