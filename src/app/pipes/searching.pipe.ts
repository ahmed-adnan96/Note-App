import { Pipe, PipeTransform } from '@angular/core';
import { Data } from '../interfaces/data';

@Pipe({
  name: 'searching', 
  standalone : true
})
export class SearchingPipe implements PipeTransform {

  transform(data: Data[], searchKey: string = ''): any {
    return data.filter((note)=>note.title.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
