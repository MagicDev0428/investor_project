import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { InvestmentService } from '../service/investment.service';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { BalanceService } from '../service/balance.service';

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
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['../adam/investorForm.scss', './balance.component.scss'],
})

export class BalanceComponent extends BaseComponent {
  @Output() isShown = new EventEmitter<boolean>();
  @Input() params: any = {};

  amount = '';
  userId = '';
  investmentId: any = '';
  profit_balance: any = [];

  selectedInvestment$!: Observable<string | number>;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService,
    private formBuilder: FormBuilder,
    private balanceService: BalanceService,
  ) {
    super(router, auth, toastrService);
    this.selectedInvestment$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestment$.subscribe(res => {
      this.investmentId = res;
    });
  }

  ngOnInit(): void {
    this.profit_balance = profit_balance_temp;
    this.userId = this.params?.params?.userId;
        if (typeof this.userId !== 'undefined') {
            this.balanceService.getInvestorBalance(this.userId).subscribe({
                next: (res) => {
                    console.log('res->', res);
                },
                error: err => {
                    this.toastrService.error(err);
                },
                complete: () => console.log('There are no more action happen.')
            });
        }
  }

  onClose() {
    this.isShown.emit(true);
  }

  protected onSubmit(): void {

  }
}
