import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { InvestmentService } from '../service/investment.service';
import { AuthService } from '@auth0/auth0-angular';

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
    ['Feb-2023', 'Paid 2% from investment of 10,000,000', 1210000, 0, 8700000, '18-Jan-24', '30-Jan-2024'],
    ['Oct-2023', 'Paid 2% from investment of 7,500,000', 150000, 0, 8700000, '15-Oct-23', '23-Oct-23'],
    ['Oct-2023', 'NEW Investment: 2,500.000', 0, 0, 8700000, '25-Oct-23', '23-Oct-23'],
    ['Nov-2023', 'Paid 2% from investment of 7,500,000', 150000, 0, 8700000, '15-Nov-23', '15-Nov-23'],
    ['Dec-2023', 'Paid 2% from investment of 7,500,000', 210000, 0, 8700000, '15-Dec-23', '15-Dec-23'],
    ['Jan-2023', 'Paid 2% from investment of 7,500,000', 210000, 0, 8700000, '18-Jan-24', '18-Jan-24'],
    ['Jan-2023', 'Transfer 82.000 DKK to Denmark', 0, -400000, 8700000, '30-Jan-24', '30-Jan-24'],
    ['Feb-2023', 'Paid 2% from investment of 10,000,000', 1210000, 0, 8700000, '18-Jan-24', '30-Jan-2024'],
  ],
}

@Component({
  selector: 'app-investor-portfolio',
  templateUrl: './balance.component.html',
  styleUrls: ['../adam/investorForm.scss', './balance.component.scss'],
})

export class BalanceComponent extends BaseComponent {

  amount = '';
  investmentId: any = '';
  name: string = 'Mark Sejr Snowman (Mark)';
  base_info: any = [];
  investments: any = [];
  profit_balance: any = [];

  selectedInvestment$!: Observable<string | number>;

  constructor(
    router: Router,
    auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService,
    private formBuilder: FormBuilder,
  ) {
    super(router, auth);
    this.selectedInvestment$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestment$.subscribe(res => {
      this.investmentId = res;
    });
    this.auth.user$.subscribe(result => {
      console.log('user->', result);
      this.user = result['investor-system'];
      this.name = this.user.name;
    });
  }

  ngOnInit(): void {
    this.base_info = base_temp;
    this.investments = investment_temp;
    this.profit_balance = profit_balance_temp;
  }

  protected onSubmit(): void {

  }
}
