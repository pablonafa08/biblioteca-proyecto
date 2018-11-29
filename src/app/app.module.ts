import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
//import {HttpClientModule} from '@angular/common/http';



import { DanioService } from './services/porc_daños.service';
import { BibliotecarioService } from './services/bibliotecarios.service';
import { PuestoService } from './services/puestos.service';
import { RetrasoService } from './services/porc_retrasos.service';
import { CategoriaService } from './services/categorias.service';
import { LibroService } from './services/libros.service';
import { UsuarioService } from './services/usuarios.service';
import { PublicoService } from './services/pub_gral.service';
import { UploadService } from './services/upload.service';
import { PrecioCredencialService } from './services/preciocredencial.service';
import { CredencialService } from './services/credenciales.service';
import { PrestamoService } from './services/prestamos.service';
import { LibDaniadoService } from './services/daños.service';
import { CorteCajaService } from './services/corte_caja.service';

import { CatalogoPipe } from './pipes/catalogo.pipe';
import { UsuarioPipe } from './pipes/usuarios.pipe';
import { UsuarioPresPipe } from './pipes/usuariopres.pipe';
import { bibliotecarioPipe } from './pipes/bibliotecarios.pipe';
import { ConvertirPipe } from './pipes/convertir.pipe';

import { AppComponent } from './app.component';
import { BibliotecariosComponent } from './administracion/bibliotecarios/bibliotecarios.component';
import { LibrosComponent } from './libros/libros/libros.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { PublicoGeneralComponent } from './usuarios/publico-general/publico-general.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { PuestosComponent } from './administracion/puestos/puestos.component';
import { PorcentajesComponent } from './administracion/porcentajes/porcentajes.component';
import { CatalogoComponent } from './libros/catalogo/catalogo.component';
import { CategoriasComponent } from './libros/categorias/categorias.component';
import { TodosbiblioComponent } from './administracion/todosbiblio/todosbiblio.component';
import { TodosusuaComponent } from './usuarios/todosusua/todosusua.component';
import { TodospresComponent } from './preydev/todospres/todospres.component';
import { BibliotecarioComponent } from './administracion/detalle/bibliotecario/bibliotecario.component';
import { UsuarioComponent } from './usuarios/detalle/usuario/usuario.component';
import { LibroComponent } from './libros/detalle/libro/libro.component';
import { EditarpuestosComponent } from './administracion/editarpuestos/editarpuestos.component';
import { EditarbibliotecariosComponent } from './administracion/editarbibliotecarios/editarbibliotecarios.component';
import { EditporcentajesComponent } from './administracion/editporcentajes/editporcentajes.component';
import { EditcategoriasComponent } from './libros/editcategorias/editcategorias.component';
import { EditlibrosComponent } from './libros/editlibros/editlibros.component';
import { EditusuariosComponent } from './usuarios/editusuarios/editusuarios.component';
import { PreciocredencialComponent } from './administracion/preciocredencial/preciocredencial.component';
import { PrestamosComponent } from './preydev/prestamos/prestamos.component';
import { CortecajaComponent } from './administracion/cortecaja/cortecaja.component';
import { RenovarcredencialComponent } from './usuarios/renovarcredencial/renovarcredencial.component';
import { DevolucionesComponent } from './preydev/devoluciones/devoluciones.component';
import { DevolucionespendComponent } from './preydev/devolucionespend/devolucionespend.component';
import { IngresosComponent } from './administracion/ingresos/ingresos.component';
import { RepyestComponent } from './repyest/repyest/repyest.component';
import { LoginComponent } from './login/login.component';









const routes: Routes = [
  {path: '',component: InicioComponent},
  {path: 'bibliotecarios', component: BibliotecariosComponent},
  {path: 'todosbibliotecarios', component: TodosbiblioComponent},
  {path: 'bibliotecario/:id', component: BibliotecarioComponent},
  {path: 'bibliotecarioedit/:id', component: EditarbibliotecariosComponent},
  {path: 'puestos', component: PuestosComponent},
  {path: 'puesto/:id', component: EditarpuestosComponent},
  {path: 'cortecaja', component: CortecajaComponent},
  {path: 'ingresos', component: IngresosComponent},
  {path: 'preciocredencial', component: PreciocredencialComponent},
  {path: 'porcentajes', component: PorcentajesComponent},
  {path: 'porcentajesedit/:id', component: EditporcentajesComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'libro/:id', component: LibroComponent},
  {path: 'libros', component: LibrosComponent},
  {path: 'librosedit/:id', component: EditlibrosComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'categoriasedit/:id', component: EditcategoriasComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'todosusuarios', component: TodosusuaComponent},
  {path: 'usuario/:id', component: UsuarioComponent},
  {path: 'renovarcredencial', component: RenovarcredencialComponent},
  {path: 'usuariosedit/:id', component: EditusuariosComponent},
  {path: 'pubgeneral', component: PublicoGeneralComponent},
  {path: 'prestamos', component: PrestamosComponent},
  {path: 'devoluciones', component: DevolucionesComponent},
  {path: 'todosprestamos', component: TodospresComponent},
  {path: 'devolucionespend', component: DevolucionespendComponent},
  {path: 'repyest', component: RepyestComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BibliotecariosComponent,
    LibrosComponent,
    UsuariosComponent,
    PublicoGeneralComponent,
    HeaderComponent,
    InicioComponent,
    PuestosComponent,
    PorcentajesComponent,
    CatalogoComponent,
    CategoriasComponent,
    TodosbiblioComponent,
    TodosusuaComponent,
    TodospresComponent,
    BibliotecarioComponent,
    UsuarioComponent,
    LibroComponent,
    EditarpuestosComponent,
    EditarbibliotecariosComponent,
    EditporcentajesComponent,
    EditcategoriasComponent,
    EditlibrosComponent,
    EditusuariosComponent,
    PreciocredencialComponent,
    PrestamosComponent,
    CatalogoPipe,
    UsuarioPipe,
    UsuarioPresPipe,
    bibliotecarioPipe,
    ConvertirPipe,
    CortecajaComponent,
    RenovarcredencialComponent,
    DevolucionesComponent,
    DevolucionespendComponent,
    IngresosComponent,
    RepyestComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    //HttpClientModule
    HttpModule,
    ChartsModule
    
  ],
  providers: [
    DanioService,
    BibliotecarioService,
    PuestoService,
    RetrasoService,
    CategoriaService,
    LibroService,
    UsuarioService,
    PublicoService,
    UploadService,
    PrecioCredencialService,
    CredencialService,
    PrestamoService,
    LibDaniadoService,
    CorteCajaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
