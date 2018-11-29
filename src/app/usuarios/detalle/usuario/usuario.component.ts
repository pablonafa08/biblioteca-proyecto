import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Usuario } from '../../../models/usuarios';
import { UsuarioService } from '../../../services/usuarios.service';
import { Prestamo } from '../../../models/prestamos';
import { PrestamoService } from '../../../services/prestamos.service';
import { GLOBAL } from '../../../services/global';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public usuario:Usuario;
  public prestamos: Prestamo[];
  public url: String;
  constructor(
    private usuarioService: UsuarioService,
    private route : ActivatedRoute,
    private router : Router,
    private prestamoService: PrestamoService
  ) { 
    this.url = GLOBAL.url+'libros/';
  }

  ngOnInit() {
    this.getUsuario();
  }


  getUsuario(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];

      this.usuarioService.getUsuario(id).subscribe(
        res=>{
          if(!res.usuario){
            this.router.navigate(['/']);
          }else{
            this.usuario = res.usuario;
          }
        },
        err=>{
          console.log(<any>err);
          this.router.navigate(['/']);
        }
      );
      
      this.prestamoService.getPresyDevolucionesByUser(id).subscribe(
        res=>{
          if(!res.prestamos){
            this.router.navigate(['/']);
          }else{
            this.prestamos = res.prestamos;
            console.log(this.prestamos);
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
