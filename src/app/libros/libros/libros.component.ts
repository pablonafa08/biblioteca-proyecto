import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libros';
import { LibroService } from '../../services/libros.service';
import { Categoria } from '../../models/categorias';
import { CategoriaService } from '../../services/categorias.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  public categorias: Categoria[];
  public libro:Libro;
  public status:String;
  public url: String;
  constructor(
    private libroService:LibroService,
    private categoriaService: CategoriaService,
    private uploadService: UploadService
  ) { 
    this.libro = new Libro('','','','','','',null,null,'','',null,'A',null);
    this.url = GLOBAL.url+'libros/';
  }

  ngOnInit() {
    this.categoriaService.allCategorias().subscribe(
      res=>{
        if(res.categorias){
          this.categorias = res.categorias;
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }


  onSubmit(){
    this.libro.disponibles = this.libro.existencia;
    this.libroService.register(this.libro).subscribe(
      res =>{
        if(res.libro){
          this.status = 'success';
          this.libro = res.libro;
          console.log('Se pudo');
          if(this.filesToUpload){
            this.uploadService.makeFileRequest(this.url+'imagen/'+this.libro._id, [], this.filesToUpload, 'imagen')
            .then((result: any)=>{
              this.libro.imagen = result.imagen;
            });
          }
          this.libro = new Libro('','','','','','',null,null,'','',null,'A',null);
          this.ngOnInit();
        }else{
          this.status = 'error';
          console.log('No se pudo');
        }
        
        
      },
      err =>{
        console.log(<any>err);
        console.log('No se pudo');
      }
    );
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
