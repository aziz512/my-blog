import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { RESPONSE, REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';
import { Request, Response } from 'express';

@Component({
  selector: 'blog-not-found',
  template: `<h2>Seems like this page doesn't exist :(</h2>`
})
export class NotFoundComponent implements OnInit {
  constructor(@Optional() @Inject(REQUEST) private request: Request,
              @Optional() @Inject(RESPONSE) private response: Response,
              @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.response.status(404);
    }
  }
}
