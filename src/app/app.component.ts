import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { HotToastService } from '@ngneat/hot-toast';
import { MessagingService } from './services/messaging.service';

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
    private toast: HotToastService,
    private messagingService: MessagingService
  ) {
    registerLicense(environment.syncfusionKey);
    this.messagingService.requestPermission();
  }

  logout() {
    this.authService.SignOut();
  }
}
