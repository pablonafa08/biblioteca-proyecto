import { Component, OnInit } from '@angular/core';
import { CorteCaja } from '../../models/corte_caja';
import { CorteCajaService } from '../../services/corte_caja.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  public ingresos: any[] =[
    {mes:'Enero',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Febrero',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Marzo',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Abril',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Mayo',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Junio',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Julio',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Agosto',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Septiembre',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Octubre',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Noviembre',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'Diciembre',total:0,credenciales:0,danios:0,retrasos:0},
    {mes:'TOTALES',total:0,credenciales:0,danios:0,retrasos:0}
  ];
  
  public mes: any;
  constructor(
    private corteCajaService: CorteCajaService
  ) { }

  ngOnInit() {
    this.corteCajaService.allCortes().subscribe(
      res=>{
        if(res.cortes){
          //this.categorias= res.categorias;
          for (let i = 0; i < res.cortes.length; i++) {
            this.mes = res.cortes[i].fecha.split('-');
            this.ingresos[this.mes[1]-1].total = this.ingresos[this.mes[1]-1].total + res.cortes[i].total;
            this.ingresos[this.mes[1]-1].credenciales = this.ingresos[this.mes[1]-1].credenciales + res.cortes[i].tot_credencial;
            this.ingresos[this.mes[1]-1].danios = this.ingresos[this.mes[1]-1].danios + res.cortes[i].tot_danios;
            this.ingresos[this.mes[1]-1].retrasos = this.ingresos[this.mes[1]-1].retrasos + res.cortes[i].tot_retraso;
            
            this.ingresos[12].total = this.ingresos[12].total + res.cortes[i].total;
            this.ingresos[12].credenciales = this.ingresos[12].credenciales + res.cortes[i].tot_credencial;
            this.ingresos[12].danios = this.ingresos[12].danios + res.cortes[i].tot_danios;
            this.ingresos[12].retrasos = this.ingresos[12].retrasos + res.cortes[i].tot_retraso;
            
          }
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

}
