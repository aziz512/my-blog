import { Pipe, PipeTransform } from '@angular/core';
import { highlight, highlightAuto } from 'highlight.js';
import * as markdownIt from 'markdown-it';

const md = markdownIt({
  highlight(code, lang) {
    const highlightedResult = lang ? highlight(lang, code) : highlightAuto(code);
    return highlightedResult.value;
  },
  breaks: true,
  xhtmlOut: true,
  typographer: true
});

@Pipe({
  name: 'MDRenderer'
})
export class MarkdownRendererPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return md.render(value);
  }
}
