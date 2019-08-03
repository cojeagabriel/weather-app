import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'stringToDay'
})
export class StringToDayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return moment(value).format('ddd');
  }

}
