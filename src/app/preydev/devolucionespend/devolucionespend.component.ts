import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../services/prestamos.service';
import { Prestamo } from '../../models/prestamos';
import { Libro } from '../../models/libros';
import { LibroService } from '../../services/libros.service';
import { Usuario } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuarios.service';
import { Bibliotecario } from '../../models/bibliotecarios';
import { BibliotecarioService } from '../../services/bibliotecarios.service';


declare var $:any;
@Component({
  selector: 'app-devolucionespend',
  templateUrl: './devolucionespend.component.html',
  styleUrls: ['./devolucionespend.component.css']
})
export class DevolucionespendComponent implements OnInit {
  public prestamos: Prestamo[];
  public leido: boolean = false;
  public seleccionado: boolean = false;

  constructor(
    private libroService:LibroService,
    private usuarioService: UsuarioService,
    private prestamoService: PrestamoService,
    private bibliotecarioService: BibliotecarioService
  ) { 

  }
  marcar(id){
    console.log(id);
  }
  ngOnInit() {
    this.prestamoService.allPrestamos().subscribe(
      res=>{
        if(res.prestamos){
          this.prestamos= res.prestamos;
          console.log(this.prestamos);
        }
      },
      err=>{
        console.log(<any>err);
      }
    );


    if(this.seleccionado){
      $("#atrasadas").prop("disabled", true);
    }else{
      $("#pendientes").prop("disabled", true);
    }
  }

  cambiar(){
    this.seleccionado = !this.seleccionado;
    if(this.seleccionado){
      $("#atrasadas").prop("disabled", true);
      $("#pendientes").prop("disabled", false);
    }else{
      $("#pendientes").prop("disabled", true);
      $("#atrasadas").prop("disabled", false);
    }
    
    // $("#"+id).toggleClass("btn-danger btn-success");
    console.log(this.seleccionado);
  }

}
