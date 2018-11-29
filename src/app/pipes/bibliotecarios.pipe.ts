import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bibliotecarioSearch'
})

@Injectable()
export class bibliotecarioPipe implements PipeTransform{
    transform(items: any, term: any):any{

        if(term === undefined){
            return items;
        }
        return items.filter(function(item){

            return item.nombres.toLowerCase().includes(term.toLowerCase());
            
        });
        
    }
}