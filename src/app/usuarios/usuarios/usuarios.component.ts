import { Component, OnInit, DoCheck } from '@angular/core';
import { Usuario } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuarios.service';
import { CredencialService } from '../../services/credenciales.service';
import { Credencial } from '../../models/credenciales';
import { PrecioCredencial } from '../../models/preciocredencial';
import { PrecioCredencialService } from '../../services/preciocredencial.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, DoCheck {
  public usuario:Usuario;
  public credencial: Credencial;
  public status:String;
  public status2: String;

  public precios: PrecioCredencial[];
  public vacio: boolean;
  public porcentaje_p: number;
  public porcentaje_p2: number;
  public precio_p: number;
  public total:number;

  public id_credencial:String;
  public url: String;
  constructor(
    private usuarioService:UsuarioService,
    private credencialService:CredencialService,
    private precioCredencialService: PrecioCredencialService,
    private uploadService: UploadService
  ) {
    this.usuario = new Usuario('','','','','','','','','','','','','A','','Si','','');
    this.credencial = new Credencial('',null,null,null,'A');
    this.url = GLOBAL.url+'usuarios/';
   }

  ngOnInit() {
    this.precioCredencialService.allPrecio().subscribe(
      res=>{
        if(res.precio){
          this.precios = res.precio;
          console.log(this.precios.length);
          if(this.precios.length == 0){
            this.vacio = true;
            // console.log('Do babes');
          }else{
            this.vacio = false;
            this.porcentaje_p2 = this.precios[0].porcentaje;
            this.precio_p = this.precios[0].precio;
            // console.log('si hay');
            // console.log(this.id_precio);
          }
        }
      },
      err=>{
        console.log(<any>err);
      }
    );  
  }

  ngDoCheck(){
    console.log('hola');
    if(this.usuario.estudiante=="No"){
      this.porcentaje_p = 0;
    }else{
      this.porcentaje_p =this.porcentaje_p2;
    }
    this.total = this.precio_p - ((this.precio_p * this.porcentaje_p)/100);
  }

  onSubmit(){
    if(this.vacio){
      this.status2 = 'error';
    }else{
      this.status2 = 'success';
      
      //se registra la credencial
      this.credencial = new Credencial('',this.precio_p,this.porcentaje_p,this.total,'A');
      this.credencialService.register(this.credencial).subscribe(
        res =>{
          if(res.credencial){
            this.status = 'success';
            this.id_credencial = res.credencial._id;
            //se registra el usuario
            this.usuario.credencial = this.id_credencial;
            this.usuarioService.register(this.usuario).subscribe(
              res =>{
                if(res.usuario){
                  this.status = 'success';
                  this.usuario = res.usuario;
                  if(this.filesToUpload){
                    this.uploadService.makeFileRequest(this.url+'imagen/'+this.usuario._id, [], this.filesToUpload, 'imagen')
                    .then((result: any)=>{
                      this.usuario.imagen = result.imagen;
                    });
                  }
                  this.usuario = new Usuario('','','','','','','','','','','','','A','','Si','','');
                  console.log('Se pudo');
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
            //this.usuario = new Usuario('','','','','','','','','','','A','Si','','');
            // console.log('Se pudo');
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

    }

    
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
