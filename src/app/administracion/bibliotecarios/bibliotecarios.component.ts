import { Component, OnInit } from '@angular/core';
import { Bibliotecario } from '../../models/bibliotecarios';
import { BibliotecarioService } from '../../services/bibliotecarios.service';
import { PuestoService } from '../../services/puestos.service';
import { Puesto } from '../../models/puestos';


@Component({
  selector: 'app-bibliotecarios',
  templateUrl: './bibliotecarios.component.html',
  styleUrls: ['./bibliotecarios.component.css']
})
export class BibliotecariosComponent implements OnInit {
  public puestos : Puesto[];
  public bibliotecario : Bibliotecario;
  public status: String;
  public isEdit: boolean;
  constructor(
    private bibliotecarioService : BibliotecarioService,
    private puestoService: PuestoService
  ) {
    this.bibliotecario = new Bibliotecario('','','','','','','','','','','','A','');
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
    this.bibliotecarioService.register(this.bibliotecario).subscribe(
      res=>{
        if(res.bibliotecario){
          this.status = 'success';
          this.bibliotecario = new Bibliotecario('','','','','','','','','','','','A','');
          console.log('se pudo');
        }else{
          this.status = 'error';
        }
      },
      err =>{
        console.log(<any>err);
        console.log('no se pudo');
      }
    );
  }

}
