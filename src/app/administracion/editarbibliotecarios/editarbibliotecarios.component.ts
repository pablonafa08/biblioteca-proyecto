import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Bibliotecario } from '../../models/bibliotecarios';
import { BibliotecarioService } from '../../services/bibliotecarios.service';
import { PuestoService } from '../../services/puestos.service';
import { Puesto } from '../../models/puestos';

@Component({
  selector: 'app-editarbibliotecarios',
  templateUrl: '../bibliotecarios/bibliotecarios.component.html',
  styleUrls: ['./editarbibliotecarios.component.css']
})
export class EditarbibliotecariosComponent implements OnInit {
  public bibliotecario : Bibliotecario;
  public status: String;
  public isEdit: boolean;
  public puestos : Puesto[];
  constructor(
    private bibliotecarioService: BibliotecarioService,
    private puestoService: PuestoService,
    private route : ActivatedRoute,
    private router : Router
  ) {
    this.bibliotecario = new Bibliotecario('','','','','','','','','','','','A','');
    this.isEdit = true;
   }

  ngOnInit() {
    this.getBibliotecario();
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

  getBibliotecario(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];

      this.bibliotecarioService.getBibliotecario(id).subscribe(
        res=>{
          if(!res.bibliotecario){
            this.router.navigate(['/']);
          }else{
            this.bibliotecario = res.bibliotecario;
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
      console.log(this.bibliotecario.puesto);
      this.bibliotecarioService.editBibliotecario(id, this.bibliotecario).subscribe(
        res=>{
          if(res.bibliotecario){
            this.status = 'success';
            this.bibliotecario = res.bibliotecario;
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
