import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../../models/prestamos';
import { PrestamoService } from '../../services/prestamos.service';
import { Publico } from '../../models/pub_gral';
import { PublicoService } from '../../services/pub_gral.service';
import { Categoria } from '../../models/categorias';
import { CategoriaService } from '../../services/categorias.service';


declare var $:any;
@Component({
  selector: 'app-repyest',
  templateUrl: './repyest.component.html',
  styleUrls: ['./repyest.component.css']
})
export class RepyestComponent implements OnInit {
  
  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series C'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  
  public campoSeleccionado: String = 'prestamos';
  public prestamos: Prestamo[];
  public prestamos2: Prestamo[];
  public visitas: Publico[];
  public categorias: Categoria[];
  public total_prestamos: number;
  public total_visitas: number;
  public meses :any[] = [
    {mes:'Enero',total:0,danio:0,retraso:0},
    {mes:'Febrero',total:0,danio:0,retraso:0},
    {mes:'Marzo',total:0,danio:0,retraso:0},
    {mes:'Abril',total:0,danio:0,retraso:0},
    {mes:'Mayo',total:0,danio:0,retraso:0},
    {mes:'Junio',total:0,danio:0,retraso:0},
    {mes:'Julio',total:0,danio:0,retraso:0},
    {mes:'Agosto',total:0,danio:0,retraso:0},
    {mes:'Septiembre',total:0,danio:0,retraso:0},
    {mes:'Octubre',total:0,danio:0,retraso:0},
    {mes:'Noviembre',total:0,danio:0,retraso:0},
    {mes:'Diciembre',total:0,danio:0,retraso:0}
  ];
  public publico: any[] =[
    {mes:'Enero',total:0,hombre:0,estudiante:0},
    {mes:'Febrero',total:0,hombre:0,estudiante:0},
    {mes:'Marzo',total:0,hombre:0,estudiante:0},
    {mes:'Abril',total:0,hombre:0,estudiante:0},
    {mes:'Mayo',total:0,hombre:0,estudiante:0},
    {mes:'Junio',total:0,hombre:0,estudiante:0},
    {mes:'Julio',total:0,hombre:0,estudiante:0},
    {mes:'Agosto',total:0,hombre:0,estudiante:0},
    {mes:'Septiembre',total:0,hombre:0,estudiante:0},
    {mes:'Octubre',total:0,hombre:0,estudiante:0},
    {mes:'Noviembre',total:0,hombre:0,estudiante:0},
    {mes:'Diciembre',total:0,hombre:0,estudiante:0}
  ];

  public categoria: any[] =[
    {mes:'Enero',total:0,categoria:{}},
    {mes:'Febrero',total:0,categoria:{}},
    {mes:'Marzo',total:0,categoria:{}},
    {mes:'Abril',total:0,categoria:{}},
    {mes:'Mayo',total:0,categoria:{}},
    {mes:'Junio',total:0,categoria:{}},
    {mes:'Julio',total:0,categoria:{}},
    {mes:'Agosto',total:0,categoria:{}},
    {mes:'Septiembre',total:0,categoria:{}},
    {mes:'Octubre',total:0,categoria:{}},
    {mes:'Noviembre',total:0,categoria:{}},
    {mes:'Diciembre',total:0,categoria:{}}
  ];

  public mes: any;
  public datos: any = [];
  
  constructor(
    private prestamoService: PrestamoService,
    private publicoService: PublicoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    $("#publico").prop("disabled", false);
      $("#categorias").prop("disabled", false);
      $("#prestamos").prop("disabled", true);
      this.prestamoService.getPresyDevoluciones().subscribe(
        res=>{
          if(res.prestamos){
            this.prestamos= res.prestamos;
            this.total_prestamos = this.prestamos.length;
            
            for (let i = 0; i < this.total_prestamos; i++) {
              this.mes = this.prestamos[i].fecha.split('-');
              this.meses[this.mes[1]-1].total = this.meses[this.mes[1]-1].total + 1;
              if(this.prestamos[i].entrega_danio=='No'){
                this.meses[this.mes[1]-1].danio = this.meses[this.mes[1]-1].danio + 1;
              }
              if(this.prestamos[i].entrega_tiempo=='Si'){
                this.meses[this.mes[1]-1].retraso = this.meses[this.mes[1]-1].retraso + 1;
              }
              
            }
            // console.log(this.meses);
          }
        },
        err=>{
          console.log(<any>err);
        }
      );


      this.publicoService.allVisitas().subscribe(
        res=>{
          if(res.visitas){
            this.visitas= res.visitas;
            this.total_visitas = this.visitas.length;
            
            for (let i = 0; i < this.total_visitas; i++) {
              this.mes = this.visitas[i].fecha.split('-');
              this.publico[this.mes[1]-1].total = this.publico[this.mes[1]-1].total + 1;

              if(this.visitas[i].sexo=='M'){
                this.publico[this.mes[1]-1].hombre = this.publico[this.mes[1]-1].hombre + 1;
              }
              if(this.visitas[i].estudiante=='Si'){
                this.publico[this.mes[1]-1].estudiante = this.publico[this.mes[1]-1].estudiante + 1;
              }
              
            }
            // console.log(this.publico);
          }
        },
        err=>{
          console.log(<any>err);
        }
      );


      this.categoriaService.allCategorias().subscribe(
        res=>{
          if(res.categorias){
            this.categorias= res.categorias;
            console.log(this.categorias);
          }
        },
        err=>{
          console.log(<any>err);
        }
      );

      this.prestamoService.allPrestamosTodos().subscribe(
        res=>{
          if(res.prestamos){
            //this.prestamos2= res.prestamos;
            //console.log(res.prestamos[1].libro.descripcion);
            // for (let x = 0; x < res.prestamos.length; x++) {

            //   for (let i = 0; i < this.categorias.length; i++) {
                
                
            //   }
              
            // }
            
          }
        },
        err=>{
          console.log(<any>err);
        }
      );
      // this.categoria[1].categoria = {hola:0,mundo:0};
      // console.log(this.categoria);
  }

  cambiar(seleccionado){

    if(seleccionado=='prestamos'){
      $("#publico").prop("disabled", false);
      $("#categorias").prop("disabled", false);
      $("#prestamos").prop("disabled", true);
      this.campoSeleccionado = 'prestamos';
    }else if(seleccionado=='categorias'){
      $("#categorias").prop("disabled", true);
      $("#prestamos").prop("disabled", false);
      $("#publico").prop("disabled", false);
      this.campoSeleccionado = 'categorias';
    }else{
      $("#publico").prop("disabled", true);
      $("#categorias").prop("disabled", false);
      $("#prestamos").prop("disabled", false);
      this.campoSeleccionado = 'publico';
    }
    
    // $("#"+id).toggleClass("btn-danger btn-success");
    // console.log(seleccionado);
  }
}
