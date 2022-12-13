import { AuthService } from 'src/app/services/auth.service';
import { MeetService } from 'src/app/services/meet.service';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  EventSettingsModel,
  ScheduleComponent,
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentView: string = 'month';
  eventSettings: EventSettingsModel = {
    dataSource: [],
  };
  @ViewChild('scheduleObj', { static: true })
  scheduleObj!: ScheduleComponent;
  userConnected: any;
  startDate: EventEmitter<Date> = new EventEmitter<Date>();
  endDate = new Date();

  constructor(
    private meetService: MeetService,
    private authService: AuthService
  ) {
    this.endDate.setDate(1);
    this.endDate.setMonth(this.endDate.getMonth() + 1);
    this.endDate.setDate(this.endDate.getDate() - 1);
    this.endDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.authService.GetAuth().then((user) => {
      if (user) {
        this.userConnected = user;
        this.startDate.subscribe((date) => {
          this.meetService
            .getMeetsBewteenDates(
              user.uid,
              date.getTime(),
              this.endDate.getTime()
            )
            .subscribe((data) => {
              const dataSource: any = [];
              data.forEach((meet: any) => {
                const hour = meet.hour;
                const date = new Date(meet.date);
                const startDate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  hour.split(':')[0],
                  hour.split(':')[1]
                );
                const endDate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  hour.split(':')[0],
                  hour.split(':')[1]
                );
                endDate.setHours(endDate.getHours() + 1);
                dataSource.push({
                  Id: meet.id,
                  Subject: meet.firstNameUser + ' ' + meet.lastNameUser,
                  StartTime: startDate,
                  EndTime: endDate,
                });
              });
              this.scheduleObj.eventSettings.dataSource = dataSource;
            });
        });
        // get first day of month
        const date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        this.startDate.emit(date);
      }
    });
  }

  popupOpen(args: any) {
    args.cancel = true;
  }

  onActionComplete(args: any) {
    if (
      args.requestType === 'viewNavigate' ||
      args.requestType === 'dateNavigate' ||
      args.requestType === 'viewChange'
    ) {
      const currentViewDates = this.scheduleObj.getCurrentViewDates();
      this.endDate = currentViewDates[currentViewDates.length - 1];
      console.log(this.endDate);
      this.startDate.emit(currentViewDates[0]);
    }
  }
}
