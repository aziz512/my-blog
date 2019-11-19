import { Pipe, PipeTransform, Inject } from '@angular/core';
import { textifyHtml } from './utils';

@Pipe({
  name: 'excerptify'
})
export class ExcerptifyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return textifyHtml(value, 200);
  }

}
