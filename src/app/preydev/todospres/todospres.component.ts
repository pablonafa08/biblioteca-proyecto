import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../services/prestamos.service';
import { Prestamo } from '../../models/prestamos';

@Component({
  selector: 'app-todospres',
  templateUrl: './todospres.component.html',
  styleUrls: ['./todospres.component.css']
})
export class TodospresComponent implements OnInit {
  public prestamos: Prestamo[];
  public prestamo: Prestamo;
  public leido: boolean = false;
  constructor(private prestamoService: PrestamoService) { }

  ngOnInit() {
    this.prestamoService.getPresyDevoluciones().subscribe(
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
  }

}
