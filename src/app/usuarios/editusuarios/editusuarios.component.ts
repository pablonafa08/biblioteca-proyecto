import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Usuario } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuarios.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-editusuarios',
  templateUrl: './editusuarios.component.html',
  styleUrls: ['./editusuarios.component.css']
})
export class EditusuariosComponent implements OnInit {
  public usuario:Usuario;
  public status:String;
  public url: String;
  constructor(
    private usuarioService:UsuarioService,
    private route : ActivatedRoute,
    private router : Router,
    private uploadService: UploadService
  ) {
    this.usuario = new Usuario('','','','','','','','','','','','','A','','Si','','');
    this.url = GLOBAL.url+'usuarios/';
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
    });
  }

  onSubmit(){
    this.route.params.forEach((params:Params) =>{
      let id = params['id'];
    this.usuarioService.editUsuario(id,this.usuario).subscribe(
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
