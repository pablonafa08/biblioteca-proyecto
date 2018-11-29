import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class PublicoService{
    public url:string;
    constructor(
        private http:Http
    ){
        this.url = GLOBAL.url+'publico/';
    }

    public register(publico_to_register){
        let params = JSON.stringify(publico_to_register);
        let headers = new Headers({'Content-Type':'application/json'});
    
        return this.http.post(this.url+'add',params, {headers:headers}).map(res => res.json());
    }

    public allVisitas(){
       
        return this.http.get(this.url+'all').map(res=>res.json());
    }
}