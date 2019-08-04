import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsiusToFahrenheit'
})
export class CelsiusToFahrenheitPipe implements PipeTransform {

  transform(value: any, metric: string): any {
    // value = Math.round(value);
    switch (metric) {
      case 'C':
        return Math.round(value) + "˚";
        break;
      
      case 'F':
        return Math.round((value * 9 / 5) + 32) + "˚";
        break;

      default:
        return Math.round(value) + "˚";
        break;
    }
  }

}
