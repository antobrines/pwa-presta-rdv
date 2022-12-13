import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pwa-client-rdv-14';
  message: any = null;
  constructor(public authService: AuthService, private toast: HotToastService) {
    registerLicense(environment.syncfusionKey);
    this.requestPermission();
    this.listen();
  }

  logout() {
    this.authService.SignOut();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Hurraaa!!! we got the token.....');
          console.log(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log('Message received. ', payload);
      this.toast.success(payload.notification.body, {
        id: 'newMessage',
      });
    });
  }
}
