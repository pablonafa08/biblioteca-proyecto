import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class RetrasoService{
    public url:String;
    constructor(
        //private http:HttpClient
        private http:Http
    ){
        this.url=GLOBAL.url+'retrasos/';
    }

    public register(retraso_to_register){
        let params = JSON.stringify(retraso_to_register);
        let headers = new Headers({'Content-Type':'application/json'});
    
        return this.http.post(this.url+'add',params, {headers:headers}).map(res => res.json());
    }

    public allRetraso(){

        return this.http.get(this.url+'all').map(res=>res.json());
    }

    public editRetraso(id, retraso){
        let params = JSON.stringify({porcentaje:retraso});
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }
}