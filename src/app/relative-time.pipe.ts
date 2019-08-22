import { Pipe, PipeTransform } from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en/US');

@Pipe({
  name: 'timeAgo'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return timeAgo.format(value);
  }

}
