import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class BibliotecarioService{
    public url: String;
    public identify;
    public token;
    // public url2: String;
    constructor(
        private http:Http
    ){
        this.url=GLOBAL.url+'bibliotecarios/';
        // this.url2=GLOBAL.url+'puestos/';
    }

    public register(bibliotecario_to_register){
        let params = JSON.stringify(bibliotecario_to_register);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.url+'add',params, {headers: headers}).map(res => res.json());
    }

    public allBibliotecarios(){

        return this.http.get(this.url+'all').map(res=>res.json());
    }

    public getBibliotecario(id){

        return this.http.get(this.url+'getone/'+id).map(res=>res.json());
    }

    public editBibliotecario(id, bibliotecario){
        let params = JSON.stringify(bibliotecario);
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }
    
    public deleteBibliotecario(id){
        let params = JSON.stringify({estatus:'B'});
        let headers = new Headers({'Content-Type':'application/json'});

        return this.http.put(this.url+'update/'+id,params,{headers:headers}).map(res=>res.json());
    }

    signup(user_to_login,gettoken=null){
        if(gettoken !=null){
            user_to_login.gettoken = gettoken;
        }
        let params =JSON.stringify(user_to_login);
        let headers = new Headers({'Content-Type':'application/json'});
        return this.http.post(this.url+'login',params,{headers:headers}).map(res=>res.json());
    }
    
    getIdentify(){
        let identify = JSON.parse(localStorage.getItem('identify'));
        if(identify!="undefined"){
            this.identify = identify;
        }else{
            this.identify =null;
        }
        return this.identify;
    }
    getToken(){
        let token = localStorage.getItem('token');
        if(token!="undefined"){
            this.token = token;
        }else{
            this.token =null;
        }
        return this.token;
    }
}