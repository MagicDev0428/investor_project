import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { InvestorService } from '../service/investor.service';
import * as moment from 'moment';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { DraggableDialogComponent } from '../components/draggable-dialog/draggable-dialog.component';

const base_temp = {
  email: 'bee@sunnythailand.com',
  phoneNumber: '+66 123-123-1234',
  newestPayment: '16-Nov-2023',
  address: [
    'Naklua Road Soi 16/2 Gai, Naklua',
    'Banglamung Region',
    '20120 Pattaya',
    'Thailand'
  ],
  moneyTransferInfo: [
    'K-Bank (Central Branch)',
    'Mr. Mark Sejr Snowman',
    '552-1-034547'
  ]
}

const investment_temp = {
  all_investment: 9500000,
  totalProfitPaid: 9500000,
  totalProfitPaidPct: 126.4,
  investments: [
    [4500000, 2, 90000, '15-Jul-2023', '15-Jul-2023', '15-Jul-2023', 190000, 'Special deal with Mark where he\'\s allowed'],
    [2000000, 2.5, 50000, '15-Jul-2023', '15-Jul-2023', '15-Jul-2023', 150000, 'Special deal with Mark where he\'\s allowed'],
    [3000000, 3, 90000, '15-Jul-2023', '15-Jul-2023', '15-Jul-2023', 190000, 'Special deal with Mark where he\'\s allowed']
  ]
}

const profit_balance_temp = {
  balance: 9500000,
  monthlyProfit: 9500000,
  balances: [
    ['Oct-2023', 'Paid 2% from investment of 7,500,000', 150000, 0, 8700000, '15-Oct-23', '23-Oct-23'],
    ['Oct-2023', 'NEW Investment: 2,500.000', 0, 0, 8700000, '25-Oct-23', '23-Oct-23'],
    ['Nov-2023', 'Paid 2% from investment of 7,500,000', 150000, 0, 8700000, '15-Nov-23', '15-Nov-23'],
    ['Dec-2023', 'Paid 2% from investment of 7,500,000', 210000, 0, 8700000, '15-Dec-23', '15-Dec-23'],
    ['Jan-2023', 'Paid 2% from investment of 7,500,000', 210000, 0, 8700000, '18-Jan-24', '18-Jan-24'],
    ['Jan-2023', 'Transfer 82.000 DKK to Denmark', 0, -400000, 8700000, '30-Jan-24', '30-Jan-24'],
    ['Feb-2023', 'Paid 2% from investment of 10,000,000', 1210000, 0, 8700000, '18-Jan-24', ''],
  ],
}

@Component({
  selector: 'app-portfolio-for',
  templateUrl: './portfolio.component.html',
  styleUrls: ['../adam/investorForm.scss', './portfolio.component.scss'],
})

export class PortfolioComponent extends BaseComponent {
  @ViewChild(DraggableDialogComponent) dialog: DraggableDialogComponent;

  amount = '';
  userId: any = '';
  name: string = 'Mark Sejr Snowman (Mark)';
  investor: any = {
    _id: undefined,
    name: '',
    nickname: '',
    phone: '',
    email: '',
    address: '',
    postcode: 0,
    city: '',
    country: '',
    status: '',
    facebook: '',
    passport: '',
    beneficiaryName: '',
    beneficiaryEmail: '',
    beneficiaryPhone: '',
    countryToTransfer: '',
    currency: '',
    reason: '',
    passportImages: undefined,
    pincode: 0,
    isAdmin: false,
    transferType: '',
    transferInfo: '',
    investorFolderId: ''
  }
  investments: any = [];
  profit_balance: any = [];

  selectedInvestor$!: Observable<string | number>;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investorService: InvestorService
  ) {
    super(router, auth, toastrService);
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
    });
  }

  ngOnInit(): void {
    if (typeof this.userId !== 'undefined') {
      this.investorService.getInvestorInfo(this.userId).subscribe({
        next: (res) => {
          this.investor = res.investors[0]?.investor;
          let firstDate = res.investors[0]?.investor?.accountInvestments?.firstInvestment;
          this.investor.firstInvestment = firstDate ? moment(firstDate).format('DD-MMM-YYYY') : "";
          this.investor.investFor = this.getYearsAndMonths(res.investors[0]?.investor?.accountInvestments?.investForMonths);
          this.investor.monthlyProfit = res.investors[0]?.investor?.accountInvestments?.totalMonthlyProfit ?? 0;
          let newPayment = res.investors[0]?.investor?.latestAccountBalances?.latestBalance[0]?.profitMonth;
          this.investor.newestPayment = newPayment ? moment(newPayment).format('DD-MMM-YYYY') : "";
          this.investor.totalProfit = res.investors[0]?.investor?.accountBalancesTotalDeposit?.totalDeposit ?? 0;
          this.investor.totalInvestment = res.investors[0]?.investor?.totalAmountInvested?.totalInvestments ?? 0;
          this.name = `${this.userId} \"\ ${this.investor.nickname} \"\ `;
          console.log('investor->', this.investor);
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
    // this.investments = investment_temp;
    // this.profit_balance = profit_balance_temp;
  }

  open(comp: string) {
    this.dialog.onOpen(comp);
  }

  protected onSubmit(): void {

  }
}
