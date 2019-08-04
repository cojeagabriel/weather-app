import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEven'
})
export class IsEvenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value % 2 == 0? value : null;
  }

}
