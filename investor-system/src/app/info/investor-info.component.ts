import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { InvestorService } from '../service/investor.service';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';
import * as moment from "moment";

interface Message {
  message?: string;
  err?: boolean;
  error?: string;
}

@Component({
  selector: 'app-investor-info',
  templateUrl: './investor-info.component.html',
  styleUrls: ['./investor-info.component.scss']
})

export class InvestorInfoComponent extends BaseComponent {

  selectedInvestor$!: Observable<string | number>;
  userId;
  values: any = [];
  title = '';

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

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investorService: InvestorService,
  ) {
    super(router, auth, toastrService);
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
    })
  }

  ngOnInit() {
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
          this.title = `${this.investor._id} \"\ ${this.investor.nickname} \"\ `;
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

}
