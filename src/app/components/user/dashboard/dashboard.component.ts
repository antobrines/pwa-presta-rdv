import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userData: any;
  loading = true;
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const userConnected = await this.authService.GetAuth();
    const uid = userConnected.uid || '';

    if (uid !== '') {
      this.authService.GetUserData(uid).subscribe((userData) => {
        this.loading = false;
        this.userData = userData.data();
      });
    }
  }

  signOut() {
    this.authService.SignOut();
  }
}
