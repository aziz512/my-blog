import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    let formatter = moment(value);
    return formatter.format('D MMM YYYY');
  }

}
