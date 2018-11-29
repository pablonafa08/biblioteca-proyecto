import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Bibliotecario } from '../../../models/bibliotecarios';
import { BibliotecarioService } from '../../../services/bibliotecarios.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-bibliotecario',
  templateUrl: './bibliotecario.component.html',
  styleUrls: ['./bibliotecario.component.css']
})
export class BibliotecarioComponent implements OnInit {
  public bibliotecario: Bibliotecario;
  public url: String;

  constructor(
    private bibliotecarioService : BibliotecarioService,
    private route : ActivatedRoute,
    private router : Router
    ) { 
      this.url = GLOBAL.url;
    }

  ngOnInit() {
    this.getBibliotecario();
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

}
