import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

// material
import { MaterialModule } from './material/material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmComponent } from './components/user/confirm/confirm.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { MapsComponent } from './components/maps/maps.component';
import { DisponibilitesComponent } from './components/presta/disponibilites/disponibilites.component';
import { MeetComponent } from './components/meet/meet.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
} from '@syncfusion/ej2-angular-schedule';
import {
  DateTimePickerModule,
  TimePickerModule,
} from '@syncfusion/ej2-angular-calendars';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    ScheduleModule,
    DateTimePickerModule,
    TimePickerModule,
    FlexLayoutModule,
    GoogleMapsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot({
      position: 'bottom-center',
    }),
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
