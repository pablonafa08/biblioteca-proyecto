import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Categoria } from '../../models/categorias';
import { CategoriaService } from '../../services/categorias.service';

@Component({
  selector: 'app-editcategorias',
  templateUrl: './editcategorias.component.html',
  styleUrls: ['./editcategorias.component.css']
})
export class EditcategoriasComponent implements OnInit {
  public categorias: Categoria[];
  public categoria: Categoria;
  public status: String;
  constructor(
    private categoriaService: CategoriaService,
    private route : ActivatedRoute,
    private router : Router
  ) {
    this.categoria = new Categoria('','A');
   }

  ngOnInit() {
    this.getCategoria();
    this.categoriaService.allCategorias().subscribe(
      res=>{
        if(res.categorias){
          this.categorias = res.categorias;
        }
      },
      err=>{

      }
    );
  }

  getCategoria(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];

      this.categoriaService.getCategoria(id).subscribe(
        res=>{
          if(!res.categoria){
            this.router.navigate(['/']);
          }else{
            this.categoria = res.categoria;
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
    this.categoriaService.editCategoria(id,this.categoria).subscribe(
      res =>{
        if(res.categoria){
            this.status = 'success';
            this.categoria = res.categoria;
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

  deleteCategoria(id){
    this.categoriaService.deleteCategoria(id).subscribe(
      res=>{
        if(!res.categoria){
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
