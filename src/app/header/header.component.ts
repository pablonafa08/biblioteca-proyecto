import { Component, OnInit } from '@angular/core';
import { BibliotecarioService } from '../services/bibliotecarios.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public identify;
  constructor(
    private bibliotecarioService: BibliotecarioService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.identify = this.bibliotecarioService.getIdentify();
  }

  logOut(){
    localStorage.clear();
    this.identify = null;
    this._router.navigate(['/']);
    window.location.reload()
  }

}
