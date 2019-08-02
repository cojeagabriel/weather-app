import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'stringToHour'
})
export class StringToHourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).hour();
  }

}
