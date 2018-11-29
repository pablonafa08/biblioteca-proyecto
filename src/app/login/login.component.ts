import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Bibliotecario } from '../models/bibliotecarios';
import { BibliotecarioService } from '../services/bibliotecarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public bibliotecario:Bibliotecario;
  public identify;
  public otra;
  public token;
  public status:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private bibliotecarioService: BibliotecarioService
  ) { 
    this.bibliotecario = new Bibliotecario('','','','','','','','','','','','A','');
  }

  ngOnInit() {
    console.log(this.bibliotecarioService.getIdentify());
    console.log(this.bibliotecarioService.getToken());
  }

  onSubmit(){
    this.bibliotecarioService.signup(this.bibliotecario).subscribe(
      response =>{
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
