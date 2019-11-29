import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { RESPONSE, REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser } from '@angular/common';
import { Response } from 'express';

@Component({
  selector: 'blog-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {

  constructor(@Optional() @Inject(RESPONSE) private response: Response,
              @Optional() @Inject(REQUEST) private request: Request,
              @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      // tslint:disable-next-line: no-debugger
      debugger;
      this.response.status(404);
    }
  }

}
