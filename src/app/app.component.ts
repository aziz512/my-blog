import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentYear: number = (new Date()).getFullYear();
  constructor(private meta: Meta) {
    this.meta.updateTag({ name: 'author', content: 'Aziz Yokubjonov' });
  }
}
