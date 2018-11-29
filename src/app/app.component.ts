import { Component, Input, OnInit, DoCheck} from '@angular/core';
import { Bibliotecario } from './models/bibliotecarios';
import { BibliotecarioService } from './services/bibliotecarios.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Libro } from './models/libros';
import { LibroService } from './services/libros.service';
import { GLOBAL } from './services/global';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  public identify;
  public contenido: boolean = true;

  public bibliotecario:Bibliotecario;
  public token;
  public status:string;
  public url: String;
  public libros: Libro[];
  public busqueda;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private bibliotecarioService: BibliotecarioService,
    private libroService:LibroService
  ){
    this.bibliotecario = new Bibliotecario('','','','','','','','','','','','A','');
    this.url = GLOBAL.url+'libros/';
  }

  ngOnInit(){
    this.identify = this.bibliotecarioService.getIdentify();
    console.log('hola');
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

  ngDoCheck(){
    this.identify = this.bibliotecarioService.getIdentify();
    //this.contenido = true;
    // console.log(this.contenido);
    this.status = "";
    
  }

  prueba(){
    this.contenido = false;
    console.log(this.contenido);
  }
  prueba2(){
    this.contenido = true;
    console.log(this.contenido);
  }

  onSubmit(){
    console.log(this.bibliotecario.contra);
    this.bibliotecarioService.signup(this.bibliotecario).subscribe(
      response =>{
        console.log(response.bibliotecario);
       this.identify = response.bibliotecario;
       if(!this.identify || !this.identify._id){
         alert('El usuario no se ha logueado correctamente');
       }else{
         this.identify.contra='';
        //  console.log(this.identify);
         localStorage.setItem('identify',JSON.stringify(this.identify));
         this.bibliotecarioService.signup(this.bibliotecario, 'true').subscribe(
           response =>{
             this.token = response.token;
             if(this.token.lenght <= 0 ){
                 alert('El token no se ha generado');
             }else{
               this.status = 'success';
               this.contenido = true;
               //$("#contra").val("");
               localStorage.setItem('token',this.token);
               this._router.navigate(['/']);
              //  console.log(this.token);
             }
           },
             error=>{
               console.log(<any>error);
             }
         ); 
       }
      },
      error=>{
        var errorMessage=<any>error;
        if(errorMessage!=null){
         var body = JSON.parse(error._body); 
         this.status= 'error';
        }
      }
    ); 
    
   }
}
