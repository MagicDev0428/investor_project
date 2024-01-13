import { Component } from '@angular/core';
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
    total: 0
  };
  transfer_investors: any = {
    total: 0
  };
  envelop_investors: any = {
    total: 0
  };
  investor_color = {
    green: "btn btn-success",
    yellow: "btn btn-warning",
    red: "btn btn-danger",
    purple: "btn btn-info"
  }

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
        this.bank_investors.data = res.result.investors.filter((item) => item.investor.transferType === 'Thai Bank');
        this.bank_investors.total = 0;
        this.bank_investors.data.forEach(data => {
          this.bank_investors.total += data.investor.totalInvestment??0;
        });
        this.envelop_investors.data = res.result.investors.filter((item) => item.investor.transferType === 'Envelope');
        this.envelop_investors.total = 0;
        this.envelop_investors.data.forEach(data => {
          this.envelop_investors.total += data.investor.totalInvestment??0;
        });
        this.transfer_investors.data = res.result.investors.filter((item) => ((item.investor.transferType !== 'Envelope') && (item.investor.transferType !== 'Thai Bank')));
        this.transfer_investors.total = 0;
        this.transfer_investors.data.forEach(data => {
          this.transfer_investors.total += data.investor.totalInvestment??0;
        });
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
