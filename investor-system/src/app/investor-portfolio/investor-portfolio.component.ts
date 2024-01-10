import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { InvestorService } from '../service/investor.service';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-investor-portfolio',
  templateUrl: './investor-portfolio.component.html',
  styleUrls: ['../adam/investorForm.scss', './investor-portfolio.component.scss'],
})

export class InvestorPortfolioComponent extends BaseComponent {

  amount = '';
  userId: any = 'Mark Sejr Snowman (Mark)';
  investor: any = {};
  investments: any = [];
  profit_balance: any = [];

  selectedInvestor$!: Observable<string | number>;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investorService: InvestorService,
    private formBuilder: FormBuilder,
  ) {
    super(router, auth, toastrService);
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res ?? 'None';
    });
  }

  ngOnInit(): void {
    if (this.userId !== 'None') {
      this.investorService.getInvestorPortfolio(this.userId).subscribe({
        next: (res) => {
          this.investor = res.investors[0]?.investor;
          let newPayment = this.investor?.newestBalance?.profitMonth;
          this.investor.newestPayment = newPayment ? moment(newPayment).format('DD-MMM-YYYY') : "";
          this.investments = this.investor?.accountInvestments;
          this.investments.all_investment = this.investor?.accountInvestments?.allInvestments;
          this.investments.totalProfitPaid = this.investor?.accountBalances?.totalProfitPaid;
          this.investments.totalProfitPaidPct = this.investor?.profitInPercentage;
          this.profit_balance = this.investor?.accountBalances;
          this.profit_balance.monthlyProfit = this.investor?.accountInvestments?.totalProfitMonthly;
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    } else {
      if (this.user?.roles?.includes('admin')) {
        this.goTo('front-page/')
      }
    }
  }
}
