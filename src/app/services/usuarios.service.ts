import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class UsuarioService{
    public url:String;
    constructor(
        private http:Http
    ){
        this.url=GLOBAL.url+'usuarios/';
    }

    public register(usuario_to_register){
        let params = JSON.stringify(usuario_to_register);
        let headers = new Headers({'Content-Type':'application/json'});
    
        return this.http.post(this.url+'add',params, {headers:headers}).map(res => res.json());
    }

    public allUsuarios(){
        return this.http.get(this.url+'all').map(res=>res.json());
    }

    public getUsuario(id){

        return this.http.get(this.url+'getone/'+id).map(res=>res.json());
    }

    public editUsuario(id, usuario){
        let params = JSON.stringify(usuario);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }

    public deleteUsuario(id){
        let params = JSON.stringify({estatus:'B'});
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }
}