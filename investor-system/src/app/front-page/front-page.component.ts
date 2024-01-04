import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { temp_data } from './temp-data';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { InvestorService } from '../service/investor.service';


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
  payload: any = {
    date: ''
  }
  front_data: any = [];
  pay_data: any = [];
  investment_data: any = [];
  log_data: any = [];
  expire_data: any = [];
  bank_investors: any = {
    total:0
  };
  transfer_investors: any = {
    total:0
  };
  envelop_investors: any = {
    total: 0
  };

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private investorService: InvestorService
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit() {
    this.day = moment(new Date()).format('dddd DD');
  }

  getFrontData(payload: any) {
    this.investorService.getFrontPage(payload).subscribe({
      next: (res) => {
        console.log('res->', res.result);
        this.pay_data = res.result.investorProfitResult;
        this.investment_data = res.result.investmentAndLogs;
        this.log_data = this.investment_data.logRecords.map((log) => {
          log.entry = `${moment(log._id).format('DD-MMM-YYYY')} ${log.description} [${log.investorName}]`;
          return log;
        });
        this.expire_data = this.investment_data.filteredInvestments.map((invest) => {
          let temp = invest.investment;
          temp.remainingDays = invest.remainingDays;
          temp.investNo = this.formatNumber(3, temp._id);
          if ((temp.remainingDays === null) || (temp.remainingDays === undefined)) {
            temp.remainingDays = 0;
          }
          temp.red = false;
          if (temp.remainingDays < 90) {
            temp.red = true;
          }
          if ((temp.investAmount === null) || (temp.investAmount === undefined)) {
            temp.investAmount = 0;
          }
          temp.profit = temp.profitMonthly;
          if (temp.investType === 'Monthly Profit') {
            temp.profit = temp.profitMonthly ? temp.profitMonthly : 0;
          } else if (temp.investType === 'Annual Profit') {
            temp.profit = temp.profitYearly ? temp.profitYearly : 0;
          } else if (temp.investType === 'One-time Profit') {
            temp.profit = temp.profitEnd ? temp.profitEnd : 0;
          } else {
            temp.profit = temp.profitMonthly ?? temp.profitYearly ?? temp.profitEnd;
          }
          return temp;
        });
        console.log('soon->', this.expire_data);
        // this.investment_data.totalInvestors = res.investors[0].investmentResult[1].totalInvestors;
        // this.investment_data.totalProfitPaid = res.investors[0].investmentResult[3].totalDeposit;
        this.log_data.sort((a, b) => {
          if (a['_id'] > b['_id']) {
            return -1;
          } else if (a['_id'] < b['_id']) {
            return 1;
          } else {
            return 0;
          }
        });
      },
      complete: () => console.log('There are no more action happen.')
    });
  }

  selectOption(month: any) {
    this.currentMonth = month;
    this.payload.date = this.currentMonth.year + '-' + this.currentMonth.month;
    this.getFrontData(this.payload);
  }
}
