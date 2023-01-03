import { TestRoutingModule } from './test-routing.module';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { SignUpComponent } from './../components/user/sign-up/sign-up.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// material
import { MaterialModule } from './../material/material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoadingComponent } from './../components/loading/loading.component';
import { ConfirmComponent } from './../components/user/confirm/confirm.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { MapsComponent } from './../components/maps/maps.component';
import { DisponibilitesComponent } from './../components/presta/disponibilites/disponibilites.component';
import { MeetComponent } from './../components/meet/meet.component';
import { CalendarComponent } from './../components/calendar/calendar.component';

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
import { DashboardComponent } from '../components/user/dashboard/dashboard.component';

@NgModule({
  declarations: [
    SignUpComponent,
    LoadingComponent,
    ConfirmComponent,
    MapsComponent,
    DisponibilitesComponent,
    MeetComponent,
    CalendarComponent,
    DashboardComponent,
  ],
  imports: [
    CalendarModule,
    ScheduleModule,
    DateTimePickerModule,
    TimePickerModule,
    FlexLayoutModule,
    GoogleMapsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot({
      position: 'bottom-center',
    }),
    TestRoutingModule,
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  bootstrap: [],
})
export class TestModule {}
