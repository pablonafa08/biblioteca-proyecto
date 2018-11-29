import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Libro } from '../../models/libros';
import { LibroService } from '../../services/libros.service';
import { Categoria } from '../../models/categorias';
import { CategoriaService } from '../../services/categorias.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-editlibros',
  templateUrl: './editlibros.component.html',
  styleUrls: ['./editlibros.component.css']
})
export class EditlibrosComponent implements OnInit {
  public categorias: Categoria[];
  public libro:Libro;
  public status:String;
  public url: String;
  constructor(
    private libroService:LibroService,
    private categoriaService: CategoriaService,
    private route : ActivatedRoute,
    private router : Router,
    private uploadService: UploadService
  ) {
    this.libro = new Libro('','','','','','',null,null,'','',null,'A',null);
    this.url = GLOBAL.url+'libros/';
   }

  ngOnInit() {
    this.getLibro();
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

  onSubmit(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];
    this.libroService.editLibro(id,this.libro).subscribe(
      res =>{
        if(res.libro){
            this.status = 'success';
            this.libro = res.libro;
            if(this.filesToUpload){
              this.uploadService.makeFileRequest(this.url+'imagen/'+this.libro._id, [], this.filesToUpload, 'imagen')
              .then((result: any)=>{
                this.libro.imagen = result.imagen;
              });
            }
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
