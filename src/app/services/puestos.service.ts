import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class PuestoService{
    public url:String;
    constructor(
        private http:Http
    ){
        this.url = GLOBAL.url+'puestos/';
    }

    public register(puesto_to_register){
        let params = JSON.stringify(puesto_to_register);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.url+'add',params,{headers:headers}).map(res=>res.json());
    }

    public allpuestos(){
        // let headers = new Headers({'Content-Type':'application/json'});
        // let options = new RequestOptions({headers:headers});
        return this.http.get(this.url+'all').map(res=>res.json());
    }

    public getPuesto(id){

        return this.http.get(this.url+'getone/'+id).map(res=>res.json());
    }

    public editPuesto(id, puesto){
        let params = JSON.stringify(puesto);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }

    public deletePuesto(id){
        let params = JSON.stringify({estatus:'B'});
        let headers = new Headers({'Content-Type':'application/json'});
        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }
}