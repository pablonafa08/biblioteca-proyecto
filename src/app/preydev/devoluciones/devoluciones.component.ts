import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../services/prestamos.service';
import { Prestamo } from '../../models/prestamos';
import { Libro } from '../../models/libros';
import { LibroService } from '../../services/libros.service';
import { Usuario } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuarios.service';
import { Bibliotecario } from '../../models/bibliotecarios';
import { BibliotecarioService } from '../../services/bibliotecarios.service';
import { Danio } from '../../models/porc_daños';
import { DanioService } from '../../services/porc_daños.service';
import { RetrasoService } from '../../services/porc_retrasos.service';
import { Retraso } from '../../models/porc_retrasos';
import { LibDaniado } from '../../models/daños';
import { LibDaniadoService } from '../../services/daños.service';
declare var $:any;
@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {
  public prestamos: Prestamo[];
  public prestamo: Prestamo;
  public librop: String;
  public usuariop: String;
  public leido: boolean = false;
  public danios: Danio[];

  public fechaPres: String;
  public id_prestamo: String;
  public retraso: String;
  public dias: number;

  public por_retraso: number;
  public retrasos: Retraso[];
  public total: number;
  public cobro_retraso:number;
  public status: String;

  public libDaniado: LibDaniado;
  public comentariosD: String;
  public id_tamañoDanio: String;
  public danio: Danio;
  public cobro_danio: number;
  public precio_librox:number;

  public id_libro: String;
  public libro: Libro;
  constructor(
    private libroService:LibroService,
    private usuarioService: UsuarioService,
    private prestamoService: PrestamoService,
    private bibliotecarioService: BibliotecarioService,
    private danioService: DanioService,
    private retrasoService: RetrasoService,
    private libDaniadoService: LibDaniadoService
  ) { 
    this.libDaniado = new LibDaniado('','',0,0,'');
  }
  
  marcar(id, precio_libro){
// console.log(precio);
    this.precio_librox = precio_libro;
    this.id_prestamo = id;
    this.leido = !this.leido;
    this.prestamoService.getPrestamo(id).subscribe(
      res=>{
        if(res.prestamo){
          this.prestamo = res.prestamo;
          this.fechaPres = this.prestamo.fecha_entrega_A;
          this.id_libro = res.prestamo.libro._id;
          console.log(this.id_libro);
          console.log(this.fechaPres);
          // console.log(this.retraso);
          this.prestamoService.getRetraso(this.fechaPres).subscribe(
            res=>{
              if(res.retraso){
                this.retraso = 'No';
                this.prestamoService.getDias(this.fechaPres).subscribe(
                  res=>{
                    if(res.c){
                      this.dias = res.c;
                      this.retrasoService.allRetraso().subscribe(
                        res=>{
                          if(res.retraso){
                            this.retrasos = res.retraso;
                              this.por_retraso = this.retrasos[0].porcentaje;
                              
                              this.cobro_retraso = (precio_libro*(this.dias * this.por_retraso))/100;
                              console.log(this.cobro_retraso);
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
                    // this.router.navigate(['/']);
                  }
                );
                
              }else{
                this.retraso = 'Si';
                this.dias = 0;
                this.por_retraso = 0;
                this.cobro_retraso = 0;
              }
              this.total = this.cobro_retraso;
            },
            err=>{
              console.log(<any>err);
              // this.router.navigate(['/']);
            }
          );
        }
      },
      err=>{
        console.log(<any>err);
        // this.router.navigate(['/']);
      }
    );
  }

  desmarcar(){
    this.leido = !this.leido;
  }

  calcular(){
    if(this.prestamo.entrega_danio=='Si'){
      this.danioService.getDanio($('#tam').val()).subscribe(
        res=>{
          if(res.danio){
            this.danio = res.danio;
            this.cobro_danio = (this.precio_librox*(this.danio.porcentaje))/100;
            this.total = this.cobro_retraso + this.cobro_danio;
          }
        },
        err=>{
          console.log(<any>err);
        }
      );   
    }else{
      this.cobro_danio = 0;
      this.total = this.cobro_retraso + this.cobro_danio;
    }
    
    console.log(this.total);
  }

  onSubmit(){
    this.libroService.getLibro(this.id_libro).subscribe(
      res=>{
        if(res.libro){
          this.libro = res.libro;
        }
      },
      err=>{
        console.log(<any>err);
        // this.router.navigate(['/']);
      }
    );

    this.prestamo.entrega_tiempo = this.retraso;
    this.prestamo.dias_retraso = this.dias;
    this.prestamo.porcentaje = this.por_retraso;
    this.prestamo.cobro_retraso = this.cobro_retraso;
    this.prestamo.estatus = "B";
    this.prestamo.fecha_entrega_R = "";
    // console.log(this.prestamo);

    this.prestamoService.editPrestamo(this.id_prestamo,this.prestamo).subscribe(
      res=>{
        if(res.prestamo){
          this.status = 'success';
          if(this.prestamo.entrega_danio=='Si'){
            this.danioService.getDanio($('#tam').val()).subscribe(
              res=>{
                if(res.danio){
                  this.danio = res.danio;
                  this.cobro_danio = (this.precio_librox*(this.danio.porcentaje))/100;
                  // console.log(this.cobro_danio);
                  // console.log(this.id_prestamo);
                  this.libDaniado.prestamo = this.id_prestamo;
                  this.libDaniado.danio = $('#tam').val();
                  this.libDaniado.porcentaje = this.danio.porcentaje;
                  this.libDaniado.cobro_dan = this.cobro_danio;
                  this.libDaniado.comentarios = this.comentariosD;
                  
                  this.libDaniadoService.register(this.libDaniado).subscribe(
                    res=>{
                      if(res.daniolib){
                        this.status = 'success';
                        
                      }
                    },
                    err=>{
                      this.status = 'error';
                      console.log(<any>err);
                    }
                  );
                }
              },
              err=>{
                console.log(<any>err);
              }
            );   
          }
          this.libro.disponibles = this.libro.disponibles + 1;
          this.libroService.editLibro(this.id_libro,this.libro).subscribe(
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
        }else{
          this.status = 'error';
        }
      },
      err=>{
        console.log(<any>err);
        this.status = 'error';
      }
    );

    
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

    this.danioService.allDanios().subscribe(
      res=>{
        if(res.danios){
          this.danios= res.danios;
          console.log(this.danios);
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

}
