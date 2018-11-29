import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuarios.service';
import { CredencialService } from '../../services/credenciales.service';
import { Credencial } from '../../models/credenciales';
import { PrecioCredencial } from '../../models/preciocredencial';
import { PrecioCredencialService } from '../../services/preciocredencial.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-renovarcredencial',
  templateUrl: './renovarcredencial.component.html',
  styleUrls: ['./renovarcredencial.component.css']
})
export class RenovarcredencialComponent implements OnInit {
  public usuarios: Usuario[];
  public usuario:Usuario;
  public leido: boolean = false;
  public nombres: String;
  public direccions: String;
  public estudiante: String
  public escuelas: String;
  public grados: String;
  public totals: number;
  public id_usuario: String;
  public status:String;
  public url: String;

  public precios: PrecioCredencial[];
  public porcentaje_p: number;
  public porcentaje_p2: number;
  public precio_p: number;

  public credencial: Credencial;
  public id_credencial_vieja:String;
  public id_credencial_nueva:String;
  constructor(
    private usuarioService: UsuarioService,
    private credencialService:CredencialService,
    private precioCredencialService: PrecioCredencialService
    ) { 
      this.credencial = new Credencial('',null,null,null,'A');
      this.url = GLOBAL.url+'usuarios/';
    }
  marcar(id){
    console.log(id);
    this.id_usuario = id;
    this.usuarioService.getUsuario(id).subscribe(
      res=>{
        if(res.usuario){
          this.usuario = res.usuario;
          this.nombres = this.usuario.nombres + " " + this.usuario.app + " " + this.usuario.apm;
          this.direccions = this.usuario.calle + " #" + this.usuario.numero + " Col. " + this.usuario.colonia;
          this.estudiante = this.usuario.estudiante;
          this.id_credencial_vieja = this.usuario.credencial;
          console.log(this.id_credencial_vieja);
          if(this.estudiante == "Si"){
            this.escuelas = this.usuario.escuela;
            this.grados = this.usuario.grado;
            this.porcentaje_p2 = this.porcentaje_p;
          }else{
            this.porcentaje_p2 = 0;
          }
          console.log(this.porcentaje_p2);
          this.totals = this.precio_p - ((this.precio_p * this.porcentaje_p2)/100);
        }
      },
      err=>{
        console.log(<any>err);
        // this.router.navigate(['/']);
      }
    );
    this.leido = !this.leido;
    // this.nombres = "hola";
  }

  desmarcar(){
    this.leido = !this.leido;
  }

  onSubmit(){
    //se borra la credencial vieja
    this.credencialService.deleteCredencial(this.id_credencial_vieja).subscribe(
      res=>{
        if(res.credencial){
          this.credencial = new Credencial('',this.precio_p,this.porcentaje_p2,this.totals,'A');
          //se registra la nueva credencial
          this.credencialService.register(this.credencial).subscribe(
            res =>{
              if(res.credencial){
                this.id_credencial_nueva = res.credencial._id;
                //se actualiza el usuario
                this.usuario.credencial = this.id_credencial_nueva;
                this.usuarioService.editUsuario(this.id_usuario,this.usuario).subscribe(
                  res =>{
                    if(res.usuario){
                        this.status = 'success';
                        console.log('se pudo');
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
        }else{
          this.status = 'error';
          console.log('No se pudo');
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
    
  }

  ngOnInit() {
    this.usuarioService.allUsuarios().subscribe(
      res=>{
        if(res.usuarios){
          this.usuarios= res.usuarios;
        }
      },
      err=>{
        console.log(<any>err);
      }
    );

    this.precioCredencialService.allPrecio().subscribe(
      res=>{
        if(res.precio){
          this.precios = res.precio;
          //console.log(this.precios.length);
          this.porcentaje_p = this.precios[0].porcentaje;
          this.precio_p = this.precios[0].precio;
          console.log(this.porcentaje_p);
        }
      },
      err=>{
        console.log(<any>err);
      }
    );  
  }

}
