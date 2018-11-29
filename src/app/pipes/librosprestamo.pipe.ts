import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'catalogoPSearch'
})

@Injectable()
export class CatalogoPipe implements PipeTransform{
    transform(items: any, term: any):any{

        if(term === undefined){
            return items;
        }
        return items.filter(function(item){

            return item.libro.descripcion.toLowerCase().includes(term.toLowerCase());
     
        });
        
    }
}