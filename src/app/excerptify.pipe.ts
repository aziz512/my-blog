import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerptify'
})
export class ExcerptifyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const element = document.createElement('div');
    element.innerHTML = value;
    return element.innerText.substring(0, 250);
  }

}
