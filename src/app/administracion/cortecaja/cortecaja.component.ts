import { Component, OnInit } from '@angular/core';
import { Credencial } from '../../models/credenciales';
import { CredencialService } from '../../services/credenciales.service';
import { PrestamoService } from '../../services/prestamos.service';
import { Prestamo } from '../../models/prestamos';
import { LibDaniado } from '../../models/daños';
import { LibDaniadoService } from '../../services/daños.service';
import { CorteCaja } from '../../models/corte_caja';
import { CorteCajaService } from '../../services/corte_caja.service';
import { BibliotecarioService } from '../../services/bibliotecarios.service';


@Component({
  selector: 'app-cortecaja',
  templateUrl: './cortecaja.component.html',
  styleUrls: ['./cortecaja.component.css']
})
export class CortecajaComponent implements OnInit {
  public credenciales: Credencial[];
  public prestamos: Prestamo[];
  public daniados: LibDaniado[];
  public tot_credenciales: number = 0;
  public num_credenciales: number;
  public tot_retrasos: number = 0;
  public num_retrasos: number;
  public tot_danios: number = 0;
  public num_danios: number;

  public total: number = 0;
  public tot_num: number;

  public corte: CorteCaja;
  public status: String;
  public identify;
  constructor(
    private credencialService: CredencialService,
    private prestamoService: PrestamoService,
    private libDaniadoService: LibDaniadoService,
    private corteCajaService: CorteCajaService,
    private bibliotecarioService: BibliotecarioService
  ) {
    this.corte = new CorteCaja(0,0,0,0,'','',0);
   }

  ngOnInit() {
    this.identify = this.bibliotecarioService.getIdentify();
    this.credencialService.getCredenciales().subscribe(
      res=>{
        if(res.credenciales){
          this.credenciales = res.credenciales;
          // console.log(this.credenciales.length);
          // console.log(this.credenciales);
          this.num_credenciales = this.credenciales.length;
          for (let i = 0; i < this.num_credenciales; i++) {
            this.tot_credenciales = this.tot_credenciales + this.credenciales[i].total;
            // console.log(this.credenciales[i].total);
          }
          // console.log(this.tot_credenciales);
          
          this.prestamoService.getDevolucionesDay().subscribe(
            res=>{
              if(res.prestamos){
                this.prestamos = res.prestamos;
                this.num_retrasos = this.prestamos.length;
                for (let i = 0; i < this.num_retrasos; i++) {
                  this.tot_retrasos = this.tot_retrasos + this.prestamos[i].cobro_retraso;
                  //console.log(this.credenciales[i].total);
                }

                this.libDaniadoService.getDaniosDay().subscribe(
                  res=>{
                    if(res.daniados){
                      this.daniados = res.daniados;
                      this.num_danios = this.daniados.length;
                      for (let i = 0; i < this.num_danios; i++) {
                        this.tot_danios = this.tot_danios + this.daniados[i].cobro_dan;
                        //console.log(this.credenciales[i].total);
                      }
                      this.total = this.tot_credenciales + this.tot_retrasos + this.tot_danios;
                      this.tot_num = this.num_credenciales + this.num_retrasos + this.num_danios;
                    }
                  },
                  err=>{
                    console.log(<any>err);
                  }
                );    
              }
            },
            err=>{
              console.log(<any>err);
            }
          );    
          
          
          // if(this.precios.length == 0){
          //   this.vacio = true;
          //   // console.log('Do babes');
          // }else{
          //   this.vacio = false;
          //   this.id_precio = this.precios[0]._id;
          //   this.porcentaje_p = this.precios[0].porcentaje;
          //   this.precio_p = this.precios[0].precio;
          //   // console.log('si hay');
          //   // console.log(this.id_precio);
          // }
        }
      },
      err=>{
        console.log(<any>err);
      }
    );  
  }

  onSubmit(){
    this.corte = new CorteCaja(this.tot_credenciales,this.tot_danios,this.tot_retrasos,this.total,'',this.identify._id,this.tot_num);
    this.corteCajaService.register(this.corte).subscribe(
      res =>{
        if(res.corte){
          this.status = 'success';

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
  }

}
