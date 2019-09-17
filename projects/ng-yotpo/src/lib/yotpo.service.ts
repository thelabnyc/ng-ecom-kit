import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { INgYotpoConfig } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, empty } from 'rxjs';

declare var yotpo: {
  initWidgets: () => void;
  refreshWidgets: () => void;
};

@Injectable({
  providedIn: 'root'
})
export class YotpoService {
  constructor(
    @Inject('ngYotpoConfig') private config: INgYotpoConfig,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  getWidgetJSUrl() {
    return `//staticw2.yotpo.com/${this.config.apiKey}/widget.js`;
  }

  loadJS() {
    if (isPlatformBrowser(this.platformId)) {
      const e = document.createElement('script');
      (e.type = 'text/javascript'),
        (e.async = true),
        (e.src = this.getWidgetJSUrl());
      const t = document.getElementsByTagName('script')[0];
      if (t.parentNode) {
        t.parentNode.insertBefore(e, t);
      }
    }
  }

  isYotpoLoaded() {
    return typeof yotpo !== 'undefined';
  }

  loadWidget() {
    if (!this.isYotpoLoaded()) {
      this.loadJS();
    }
    if (this.isYotpoLoaded()) {
      setTimeout(() => yotpo.refreshWidgets());
    }
  }

  getHtmlString(pid: string) {
    if (isPlatformServer(this.platformId)) {
      return this.http
        .post<{ result: string }[]>(
          'https://staticw2.yotpo.com/batch',
          {
            app_key: this.config.apiKey,
            methods: [
              {
                method: 'main_widget',
                params: {
                  pid
                }
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'json'
          }
        )
        .pipe(
          map(response => (response[0] ? response[0].result : '')),
          catchError(err => {
            console.error('boingo');
            console.error(err);
            return empty();
          })
        );
    } else {
      return of('');
    }
  }
}
