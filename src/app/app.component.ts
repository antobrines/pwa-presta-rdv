import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from '../environments/environment';
import { MessagingService } from './services/messaging.service';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pwa-client-rdv-14';
  message: any = null;
  constructor(
    public authService: AuthService,
    private messagingService: MessagingService,
    private router: Router,
    private swUpdate: SwUpdate
  ) {
    registerLicense(environment.syncfusionKey);
    this.messagingService.requestPermission();
    this.messagingService.listenToMessages();
    if (this.swUpdate.isEnabled) {
      caches.open('pwa-install-url').then((cache) => {
        console.log('cache', cache);
        cache.match('/install-url').then((response) => {
          console.log('response', response);
          if (response) {
            response.text().then((url) => {
              console.log('url', url);
              this.router.navigateByUrl(url);
            });
          }
        });
      });
    }
  }

  logout() {
    this.authService.SignOut();
  }
}
