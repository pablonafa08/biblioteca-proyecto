import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertir'
})

@Injectable()
export class ConvertirPipe implements PipeTransform{
    transform(items: any, term: any):any{

      return items.substring(0, 10);
       
    }
}