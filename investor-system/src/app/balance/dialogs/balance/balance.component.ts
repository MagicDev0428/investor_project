import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../../../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { BalanceService } from '../../../service/balance.service';
import { InvestorService } from '../../../service/investor.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['../../../adam/investorForm.scss', './balance.component.scss'],
})

export class BalanceComponent extends BaseComponent {
  @Output() isShown = new EventEmitter<boolean>();
  @Input() params: any = {};

  amount = '';
  userId = '';
  investmentId: any = '';
  profit_balance: any = [];
  investor: any = {};
  transferType: string =''

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private balanceService: BalanceService,
    private investorService: InvestorService,
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit(): void {
    this.userId = this.params?.params?.userId;
    if (typeof this.userId !== 'undefined') {
      this.balanceService.getInvestorBalance(this.userId).subscribe({
        next: (res) => {
          this.profit_balance = res?.balances?.balancesAndMyInvestments;
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
      this.investorService.getInvestorInfo(this.userId).subscribe({
        next: (res) => {
          this.investor = res.investors[0]?.investor;
          this.transferType = this.investor?.transferType??'';
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
