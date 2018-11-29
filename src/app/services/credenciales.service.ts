import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class CredencialService{
    public url: String;
    // public url2: String;
    constructor(
        private http:Http
    ){
        this.url=GLOBAL.url+'credenciales/';
        // this.url2=GLOBAL.url+'puestos/';
    }

    public register(credencial_to_register){
        let params = JSON.stringify(credencial_to_register);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.url+'add',params, {headers: headers}).map(res => res.json());
    }

    public deleteCredencial(id){
        let params = JSON.stringify({estatus:'B'});
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }

    public getCredenciales(){

        return this.http.get(this.url+'allday').map(res=>res.json());
    }
}