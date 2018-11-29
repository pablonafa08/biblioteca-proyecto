import { Component, OnInit } from '@angular/core';
import { Bibliotecario } from '../../models/bibliotecarios';
import { BibliotecarioService } from '../../services/bibliotecarios.service';

@Component({
  selector: 'app-todosbiblio',
  templateUrl: './todosbiblio.component.html',
  styleUrls: ['./todosbiblio.component.css']
})
export class TodosbiblioComponent implements OnInit {
  public bibliotecarios: Bibliotecario[];

  constructor(private bibliotecarioService : BibliotecarioService) { }

  ngOnInit() {
    this.bibliotecarioService.allBibliotecarios().subscribe(
      res=>{
        if(res.bibliotecarios){
          this.bibliotecarios = res.bibliotecarios;
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

  deleteBibliotecario(id){
    this.bibliotecarioService.deleteBibliotecario(id).subscribe(
      res=>{
        if(!res.bibliotecario){
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
