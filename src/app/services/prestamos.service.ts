import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class PrestamoService{
    public url: String;
    // public url2: String;
    constructor(
        private http:Http
    ){
        this.url=GLOBAL.url+'librospre/';
        // this.url2=GLOBAL.url+'puestos/';
    }

    public register(prestamo_to_register){
        let params = JSON.stringify(prestamo_to_register);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.url+'add',params, {headers: headers}).map(res => res.json());
    }

    public editPrestamo(id, prestamo){
        let params = JSON.stringify(prestamo);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }

    public allPrestamos(){
        return this.http.get(this.url+'all').map(res=>res.json());
    }

    public allPrestamosTodos(){
        return this.http.get(this.url+'alltodos').map(res=>res.json());
    }

    public getPrestamo(id){

        return this.http.get(this.url+'getone/'+id).map(res=>res.json());
    }

    public getRetraso(fecha){

        return this.http.get(this.url+'fecha/'+fecha).map(res=>res.json());
    }

    public getDias(fecha){

        return this.http.get(this.url+'dias/'+fecha).map(res=>res.json());
    }

    public getDevolucionesDay(){

        return this.http.get(this.url+'allday').map(res=>res.json());
    }

    public getPresyDevoluciones(){

        return this.http.get(this.url+'alldev').map(res=>res.json());
    }

    public getPresyDevolucionesByUser(id){

        return this.http.get(this.url+'allbyuser/'+id).map(res=>res.json());
    }
}