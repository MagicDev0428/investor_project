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
  dialogParam: any = {};

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
      this.dialogParam.userId = this.userId;
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
          this.name = `${this.userId} \"${this.investor.nickname}\"`;
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
