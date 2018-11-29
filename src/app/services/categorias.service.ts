import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class CategoriaService{
    public url:String;
    constructor(
        //private http:HttpClient
        private http:Http
    ){
        this.url=GLOBAL.url+'categorias/';
    }


    public register(categoria_to_register){
        let params = JSON.stringify(categoria_to_register);
        let headers = new Headers({'Content-Type':'application/json'});
    
        return this.http.post(this.url+'add',params, {headers:headers}).map(res => res.json());
    }

    public allCategorias(){

        return this.http.get(this.url+'all').map(res=>res.json());
    }

    public getCategoria(id){

        return this.http.get(this.url+'getone/'+id).map(res=>res.json());
    }

    public editCategoria(id, categoria){
        let params = JSON.stringify(categoria);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }

    public deleteCategoria(id){
        let params = JSON.stringify({estatus:'B'});
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }
}