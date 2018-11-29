import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'catalogoSearch'
})

@Injectable()
export class CatalogoPipe implements PipeTransform{
    transform(items: any, term: any):any{
        // console.log(items);
        // console.log(term);
        // let busqueda = term.busqueda;
        // let termino = term.termino;
        if(term === undefined){
            return items;
        }
        return items.filter(function(item){
            // return item.descripcion.toLowerCase().includes(term.toLowerCase());
            //item.autor.toLowerCase().includes(term.toLowerCase());
            return item.descripcion.toLowerCase().includes(term.toLowerCase());
            //console.log(item.descripcion.toLowerCase().includes(term.toLowerCase()));
        });
        // let itemsArr:Array<any>=[];
        // busqueda = busqueda.toLowerCase();
        // for(let i=0; i < items.length ; i++){
        //     let item = items[i];
        //     let nombres = item[termino].toLowerCase();
        //     if( nombres.indexOf( busqueda ) >= 0 ){
        //         itemsArr.push(item);
        //     }
        // }
    }
}

// interface DataBusqueda{
//     termino:string,
//     busqueda:string
// }