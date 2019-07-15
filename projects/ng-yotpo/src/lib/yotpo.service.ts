import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { INgYotpoConfig } from './interfaces';

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
    @Inject(PLATFORM_ID) private platformId: Object
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
}
