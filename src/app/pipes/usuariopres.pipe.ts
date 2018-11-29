import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usuarioPSearch'
})

@Injectable()
export class UsuarioPresPipe implements PipeTransform{
    transform(items: any, term: any):any{

        if(term === undefined){
            return items;
        }
        return items.filter(function(item){

            return item.usuario.nombres.toLowerCase().includes(term.toLowerCase());
            
        });
        
    }
}