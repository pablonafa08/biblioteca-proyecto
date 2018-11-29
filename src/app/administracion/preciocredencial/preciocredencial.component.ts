import { Component, OnInit } from '@angular/core';
import { PrecioCredencial } from '../../models/preciocredencial';
import { PrecioCredencialService } from '../../services/preciocredencial.service';

@Component({
  selector: 'app-preciocredencial',
  templateUrl: './preciocredencial.component.html',
  styleUrls: ['./preciocredencial.component.css']
})
export class PreciocredencialComponent implements OnInit {
  public precio: PrecioCredencial;
  public precios: PrecioCredencial[];
  public status: String;
  public vacio: boolean;
  public id_precio: String;
  public porcentaje_p: number;
  public precio_p: number;
  constructor(
    private precioCredencialService: PrecioCredencialService
  ) { 
    this.precio = new PrecioCredencial('',null,null);
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
            this.id_precio = this.precios[0]._id;
            this.porcentaje_p = this.precios[0].porcentaje;
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

  onSubmit(){
    this.precio = new PrecioCredencial('',this.precio_p,this.porcentaje_p);
    if(this.vacio){
      this.registerPrecio();
    }else{
      this.updatePrecio();
    }
  }


  registerPrecio(){
    this.precioCredencialService.register(this.precio).subscribe(
      res =>{
        if(res.precio){
          this.status = 'success';
          this.precio = res.precio
          console.log('Se pudo');
          //this.ngOnInit();
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

  updatePrecio(){
    this.precioCredencialService.editPrecio(this.id_precio,this.precio_p,this.porcentaje_p).subscribe(
      res =>{
        if(res.precio){
          this.status = 'success';
          //this.retraso = new Retraso('',null);
          console.log('Se pudo');
        }else{
          this.status = 'error';
        }
        
      },
      err =>{
        console.log(<any>err);
        console.log('No se pudo joder');
      }
    );
  }
}
