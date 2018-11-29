import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Libro } from '../../../models/libros';
import { LibroService } from '../../../services/libros.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  public libro: Libro;
  public url: String;
  constructor(
    private libroService:LibroService,
    private route : ActivatedRoute,
    private router : Router
  ) { 
    this.url = GLOBAL.url+'libros/';
  }

  ngOnInit() {
    this.getLibro();
  }

  getLibro(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];

      this.libroService.getLibro(id).subscribe(
        res=>{
          if(!res.libro){
            this.router.navigate(['/']);
          }else{
            this.libro = res.libro;
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
