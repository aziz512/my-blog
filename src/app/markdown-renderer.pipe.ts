import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import { highlight, highlightAuto } from 'highlight.js';

@Pipe({
  name: 'MDRenderer'
})
export class MarkdownRendererPipe implements PipeTransform {
  constructor() {
    marked.setOptions({
      highlight(code, lang) {
        const highlightedResult = lang ? highlight(lang, code) : highlightAuto(code);
        return highlightedResult.value;
      },
      gfm: true,
      breaks: true,
      smartLists: true,
      xhtml: true
    });
  }

  transform(value: string, ...args: any[]): any {
    return marked(value);
  }

}
