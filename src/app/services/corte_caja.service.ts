import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class CorteCajaService{
    public url:String;
    constructor(
        //private http:HttpClient
        private http:Http
    ){
        this.url=GLOBAL.url+'cortes/';
    }

    public register(corte_to_register){
        let params = JSON.stringify(corte_to_register);
        let headers = new Headers({'Content-Type':'application/json'});
    
        return this.http.post(this.url+'add',params, {headers:headers}).map(res => res.json());
    }

    public allCortes(){

        return this.http.get(this.url+'all').map(res=>res.json());
    }
}