import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      App.addListener('backButton', () => {
        if (window.location.pathname === '/tabs/tab1') {
          App.exitApp();
        }
      });
    });
  }
}
