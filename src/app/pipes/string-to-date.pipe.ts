import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(moment(value));
    return moment(value).format('ddd, MMMM D');
  }

}
