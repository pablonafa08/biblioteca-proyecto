import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libros';
import { LibroService } from '../../services/libros.service';
import { Usuario } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuarios.service';
import { GLOBAL } from '../../services/global';
import { PrestamoService } from '../../services/prestamos.service';
import { Prestamo } from '../../models/prestamos';
import { BibliotecarioService } from '../../services/bibliotecarios.service';

declare var $:any;
@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  public libros: Libro[];
  public librob: Libro;
  public usuarios: Usuario[];
  public usuario:Usuario;
  public url: String;
  public leido: boolean = false;
  public librosel: boolean = false;
  public nombres: String;
  public status: String;
  public comentarioss: String;
  public descripcionsb: String;
  public imagenb: String;

  public id_usuario: String;
  public id_libro: String;

  public prestamo: Prestamo;
  public identify;
  public fecha: String;
  constructor(
    private libroService:LibroService,
    private usuarioService: UsuarioService,
    private prestamoService: PrestamoService,
    private bibliotecarioService: BibliotecarioService
    ) { 
    this.url = GLOBAL.url+'libros/';
    this.prestamo = new Prestamo('','','','','','','A','','','','',0,0,0);
  }

  marcar(id){
    console.log(id);
    this.id_usuario = id;
    this.usuarioService.getUsuario(id).subscribe(
      res=>{
        if(res.usuario){
          this.usuario = res.usuario;
          this.nombres = this.usuario.nombres + " " + this.usuario.app + " " + this.usuario.apm;
          
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

  marcarLibro(id){
    this.id_libro = id;
    console.log(id);
    this.libroService.getLibro(id).subscribe(
      res=>{
        if(res.libro){
          this.librob = res.libro;
          this.descripcionsb = this.librob.descripcion;
          this.imagenb =  this.librob.imagen;

          //this.nombres = this.usuario.nombres + " " + this.usuario.app + " " + this.usuario.apm;
          console.log(this.imagenb);
        }
      },
      err=>{
        console.log(<any>err);
        // this.router.navigate(['/']);
      }
    );
    this.librosel = !this.librosel;
    // $("#"+id).prop("disabled", true);
    // $("#"+id).toggleClass("btn-danger btn-success");
    // $("#"+id).html("Seleccionado");
  }

  desmarcarLibro(){
    this.librosel = !this.librosel;
  }


  onSubmit(){
    this.prestamo = new Prestamo('',this.id_libro,this.id_usuario,this.identify._id,'',this.fecha,'A',this.comentarioss,'','','',0,0,0);
    this.librob.disponibles = this.librob.disponibles - 1;
    this.prestamoService.register(this.prestamo).subscribe(
      res=>{
        if(res.prestamo){
          this.status = 'success';
          this.libroService.editLibro(this.id_libro,this.librob).subscribe(
            res =>{
              if(res.libro){
                  this.status = 'success';
                  console.log('se pudo');
      
                  // this.ngOnInit();
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
          //this.prestamo = new Bibliotecario('','','','','','','','','','','','A','');
          console.log('se pudo');
        }else{
          this.status = 'error';
        }
      },
      err =>{
        console.log(<any>err);
        console.log('no se pudo');
      }
    );
  }

  ngOnInit() {
    this.identify = this.bibliotecarioService.getIdentify();
    //console.log(this.identify._id);

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

}
