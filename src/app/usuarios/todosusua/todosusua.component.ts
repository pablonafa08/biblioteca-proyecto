import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuarios.service';


@Component({
  selector: 'app-todosusua',
  templateUrl: './todosusua.component.html',
  styleUrls: ['./todosusua.component.css']
})
export class TodosusuaComponent implements OnInit {
  public usuarios: Usuario[];
  public usuario: Usuario;
  constructor(private usuarioService: UsuarioService) {

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
  }

  deleteUsuario(id){
    this.usuarioService.deleteUsuario(id).subscribe(
      res=>{
        if(!res.usuario){
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
