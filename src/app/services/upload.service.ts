import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { resolve } from 'q';

@Injectable()
export class UploadService{
    //public url: String;
    // public url2: String;
    constructor(
        private http:Http
    ){
        //this.url=GLOBAL.url+'libros/';
        // this.url2=GLOBAL.url+'puestos/';
    }

    public makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        return new Promise((resolve, reject)=>{
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}