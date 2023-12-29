import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { temp_data } from './temp-data';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  selectedDate = new Date();

  selectedOption: string = 'Select a Month';
  isDropdownOpen: boolean = false;
  pastMonths: any = [];

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit() {
    this.currentMonth.monthName = moment(new Date()).format('MMMM');
    this.currentMonth.month = moment(new Date()).format('MM');
    this.currentMonth.year = moment(new Date()).format('YYYY');
    this.day = moment(new Date()).format('dddd DD');
    this.selectedOption = this.currentMonth.monthName + ' ' + this.currentMonth.year;
    this.selectedDate = new Date(this.currentMonth.year, this.currentMonth.month-1, 1, 0, 0, 0, 0);
    this.pastMonths = this.getPastMonthsAndYears(Number(this.currentMonth.month), Number(this.currentMonth.year));
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    this.pastMonths = this.pastMonths.filter(() => false);
    this.pastMonths = this.getPastMonthsAndYears(Number(this.currentMonth.month), Number(this.currentMonth.year));
  }

  selectOption(option: any): void {
    this.selectedOption = option.monthName + ' ' + option.year;
    this.isDropdownOpen = true;
    this.currentMonth.monthName = option.monthName;
    this.currentMonth.month = option.month;
    this.currentMonth.year = option.year;
    this.selectedDate = new Date(this.currentMonth.year, this.currentMonth.month-1, 1, 0, 0, 0, 0);
    this.pastMonths = this.pastMonths.filter(() => false);
    this.pastMonths = this.getPastMonthsAndYears(option.month, option.year);
  }

  onChangeRange(event: Event, direction: string) {
    event.stopPropagation();
    if (direction === 'up') {
      let firstMonth = this.pastMonths[0];
      this.pastMonths = this.pastMonths.filter(() => false);
      this.pastMonths = this.getFutureMonthsAndYears(firstMonth.month, firstMonth.year);
    } else if (direction === 'down') {
      let lastMonth = this.pastMonths.pop();
      this.pastMonths = this.pastMonths.filter(() => false);
      this.pastMonths = this.getPastMonthsAndYears(lastMonth.month, lastMonth.year);
    }
  }
}
