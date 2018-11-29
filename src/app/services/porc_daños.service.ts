// import { Injectable } from '@angular/core';
//  import {Http, Response, Headers } from '@angular/http';
// import {HttpClient} from '@angular/common/http';

// import {map} from 'rxjs/operators';
// import {Observable} from 'rxjs';
// import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable() 
export class DanioService{
    public url:String;
    constructor(
        //private http:HttpClient
        private http:Http
    ){
        this.url=GLOBAL.url+'danios/';
    }
    // public register(danio_to_register){
    //     //let params = JSON.stringify(danio_to_register);
    //     let headers = new Headers({'Content-Type':'application/json'});

    //     return this.http.post(this.url+'danios/add',danio_to_register);
    // }
    public register(danio_to_register){
        let params = JSON.stringify(danio_to_register);
        let headers = new Headers({'Content-Type':'application/json'});
    
        return this.http.post(this.url+'add',params, {headers:headers}).map(res => res.json());
    }

    public allDanios(){

        return this.http.get(this.url+'all').map(res=>res.json());
    }

    public getDanio(id){

        return this.http.get(this.url+'getone/'+id).map(res=>res.json());
    }

    public editDanio(id, danio){
        let params = JSON.stringify(danio);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }

    public deleteDanio(id){
        let params = JSON.stringify({estatus:'B'});
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }
}