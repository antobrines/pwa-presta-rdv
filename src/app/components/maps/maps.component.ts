import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AuthService } from 'src/app/services/auth.service';
import { GeofireService } from 'src/app/services/geofire.service';
import { MeetService } from 'src/app/services/meet.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  centerInitial = { lat: 48.864716, lng: 2.349014 };
  centerCurrent = { lat: 48.864716, lng: 2.349014 };
  myPostion = { lat: 48.864716, lng: 2.349014 };
  markers: any = [];
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    mapTypeControl: false,
    maxZoom: 16,
    minZoom: 4,
  };
  infoContent = '';

  @ViewChild(MapInfoWindow)
  info!: MapInfoWindow;
  @ViewChild(GoogleMap) map!: GoogleMap;
  public dateSelected: EventEmitter<Date> = new EventEmitter();
  private dateCurrent = new Date();
  userConnected: any;

  constructor(
    private authService: AuthService,
    private meetService: MeetService
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.centerInitial = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.centerCurrent = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.myPostion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnInit(): void {
    this.authService.GetAuth().then((user) => {
      if (user) {
        this.userConnected = user;
        this.dateSelected.subscribe((date) => {
          this.dateCurrent = date;
          this.getMeets(date);
        });
      }
    });
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content.title;
    this.info.open(marker);
  }

  getMeets(date: Date) {
    this.meetService
      .getMeetsUserDate(this.userConnected.uid, date.getTime())
      .subscribe((meets) => {
        this.markers = [];
        meets.forEach((meet: any) => {
          this.markers.push({
            position: {
              lat: meet.lat,
              lng: meet.lng,
            },
            title: `${meet.firstNameUser} ${meet.lastNameUser}`,
            options: { animation: google.maps.Animation.DROP },
            meet: meet,
          });
        });
      });
  }

  changeDay(input: number) {
    if (input == -1) {
      this.dateCurrent.setDate(this.dateCurrent.getDate() - 1);
      this.dateCurrent.setHours(0, 0, 0, 0);
      this.dateSelected.emit(this.dateCurrent);
    } else {
      this.dateCurrent.setDate(this.dateCurrent.getDate() + 1);
      this.dateCurrent.setHours(0, 0, 0, 0);
      this.dateSelected.emit(this.dateCurrent);
    }
  }
}
