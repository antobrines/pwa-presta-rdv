import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  isLoggedIn: boolean = false;
  installPromptEvent: any;
  constructor(public authService: AuthService) {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      this.installPromptEvent = event;
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  async installPwa() {
    if (this.installPromptEvent) {
      const outcome = await this.installPromptEvent.prompt();
      if (outcome === 'accepted') {
        console.log('PWA installed');
      } else {
        console.log('PWA installation cancelled');
      }
      this.installPromptEvent = null;
    }
  }
}
