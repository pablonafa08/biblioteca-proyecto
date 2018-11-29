import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class LibDaniadoService{
    public url: String;
    // public url2: String;
    constructor(
        private http:Http
    ){
        this.url=GLOBAL.url+'librosdan/';
        // this.url2=GLOBAL.url+'puestos/';
    }

    public register(libDaniado_to_register){
        let params = JSON.stringify(libDaniado_to_register);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.url+'add',params, {headers: headers}).map(res => res.json());
    }

    public getDaniosDay(){

        return this.http.get(this.url+'allday').map(res=>res.json());
    }

}