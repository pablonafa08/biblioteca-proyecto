import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categorias';
import { CategoriaService } from '../../services/categorias.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  public categorias: Categoria[];
  public categoria: Categoria;
  public status: String;
  constructor(
    private categoriaService: CategoriaService
  ) { 
    this.categoria = new Categoria('','A');
  }

  ngOnInit() {
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


  onSubmit(){
    this.categoriaService.register(this.categoria).subscribe(
      res =>{
        if(res.categoria){
          this.status = 'success';
          this.categoria = new Categoria('','A');
          console.log('Se pudo');
          this.ngOnInit();
        }else{
          this.status = 'error';
          console.log('No se pudo');
        }
        
        
      },
      err =>{
        console.log(<any>err);
        console.log('No se pudo joder');
      }
    );
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
