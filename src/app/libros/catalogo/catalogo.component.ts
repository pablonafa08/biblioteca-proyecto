import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libros';
import { LibroService } from '../../services/libros.service';
import { GLOBAL } from '../../services/global';
import { CatalogoPipe } from '../../pipes/catalogo.pipe';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  public titulo_c: String;
  public url: String;
  public libros: Libro[];
  public busqueda;
  constructor(private libroService:LibroService) { 
    this.titulo_c = 'catalogo';
    this.url = GLOBAL.url+'libros/';
  }

  ngOnInit() {
    this.libroService.allLibros().subscribe(
      res=>{
        if(res.libros){
          this.libros = res.libros;
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

  deleteLibro(id){
    this.libroService.deleteLibro(id).subscribe(
      res=>{
        if(!res.libro){
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
