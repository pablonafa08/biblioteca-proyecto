import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usuarioSearch'
})

@Injectable()
export class UsuarioPipe implements PipeTransform{
    transform(items: any, term: any):any{

        if(term === undefined){
            return items;
        }
        return items.filter(function(item){

            return item.nombres.toLowerCase().includes(term.toLowerCase());
            
        });
        
    }
}