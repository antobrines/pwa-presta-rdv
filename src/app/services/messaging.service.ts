import { EventEmitter, Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  message: EventEmitter<boolean> = new EventEmitter();
  constructor(private deviceService: DeviceDetectorService) {}

  getDevice() {
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    let device = 'mobile';
    if (isTablet) {
      device = 'tablet';
    } else if (isDesktopDevice) {
      device = 'desktop';
    }
    return {
      device,
      deviceInfo: this.deviceService.getDeviceInfo(),
    };
  }

  sendNotificationToUser() {
    const device = this.getDevice();
    const message = {
      notification: {
        title: 'New Message',
        body: 'You have a new message from your friend',
      },
    };
    const options = {
      priority: 'high',
      timeToLive: 60 * 60 * 24,
    };
  }

  async getTokenMessage() {
    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey: environment.firebase.vapidKey,
    });
    return token;
  }

  listenToMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log('Message received. ', payload);
      this.message.emit(payload);
    });
  }

  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }
}
