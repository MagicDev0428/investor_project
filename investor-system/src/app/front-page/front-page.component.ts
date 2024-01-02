import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { temp_data } from './temp-data';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})

export class FrontPageComponent extends BaseComponent {

  data = temp_data;
  currentMonth: any = {
    month: '',
    monthName: '',
    year: '2023'
  }
  day = '';
  selectedDate: string = '';

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit() {
    this.day = moment(new Date()).format('dddd DD');
  }

  selectOption(month: any) {
    this.currentMonth = month;
  }
}
