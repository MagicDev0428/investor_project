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
import { Adam } from '../model/adam';
import * as moment from 'moment';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-investment-info',
  templateUrl: './investment-info.component.html',
  styleUrls: ['../adam/investorForm.scss', './investment-info.component.scss'],
})

export class InvestmentInfoComponent extends BaseComponent {

  amount = '';
  textAlign = '';
  files: any[] = [];
  items = [];
  logs = [];
  title: string = '';
  investmentId: any = '';

  investmentInfo: any = [];
  adams: any = [];
  sumOfTotalAmountAdam: number = 0;

  myInvestments: any[];
  sumOfTotalAmountInvested: number = 0;
  investmentMissing: number = 0;

  logEtries: any = [];

  protected investmentInfoForm: FormGroup;

  selectedInvestment$!: Observable<string | number>;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService,
    private formBuilder: FormBuilder
  ) {
    super(router, auth, toastrService);
    this.selectedInvestment$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestment$.subscribe(res => {
      this.investmentId = res;
    });
  }

  ngOnInit(): void {
    this.investmentInfoForm = this.formBuilder.group(
      {
        investment: new FormControl(),
        description: new FormControl(""),
        totalAmount: new FormControl(""),
        expireIn: new FormControl(""),
        investmentType: new FormControl(""),
        monthlyProfit: new FormControl(""),
        annualProfit: new FormControl(""),
        endProfit: new FormControl(""),
      });
    this.investmentService.getInvestmentInfo(this.investmentId).subscribe((res) => {
      this.investmentInfo = res.investmentInfo[0];

      this.investmentInfoForm.get('investment').setValue(this.investmentInfo._id);
      this.investmentInfoForm.get('description').setValue(this.investmentInfo.investments?.explanation);
      this.investmentInfoForm.get('totalAmount').setValue(this.currency_style(this.investmentInfo.investments?.investAmount));
      this.investmentInfoForm.get('expireIn').setValue(this.investmentInfo?.investments?.remainingDays + ' days');
      this.investmentInfoForm.get('investmentType').setValue(this.investmentInfo.investments?.investType);
      this.investmentInfoForm.get('monthlyProfit').setValue(this.profit_style(this.investmentInfo.investments?.profitMonthly));
      this.investmentInfoForm.get('annualProfit').setValue(this.profit_style(this.investmentInfo.investments?.profitYearly));
      this.investmentInfoForm.get('endProfit').setValue(this.profit_style(this.investmentInfo.investments?.profitEnd));
      this.checkProfitDisable();

      this.adams = res.investmentInfo[0].investments?.adams?.adams.map(obj => {
        obj.amount = this.currency_style(obj.amount);
        obj.createdDate = moment(obj.createdDate).format('DD-MMM-YYYY');
        obj.modifiedDate = moment(obj.modifiedDate).format('DD-MMM-YYYY');
        return obj;
      });
      this.logEtries = res.investmentInfo[0].investments?.logs?.logs.map(obj => {
        obj.log = `${moment(obj._id).format('DD-MMM-YYYY')} ${obj.description}`;
        return obj;
      });
      this.sumOfTotalAmountAdam = this.currency_style(res.investmentInfo[0].investments?.adams?.
        sumOfTotalAmountAdam) ? this.currency_style(res.investmentInfo[0].investments?.adams?.
          sumOfTotalAmountAdam) : this.currency_style(0);
      this.myInvestments = res.investmentInfo[0].investments?.myInvestmentsList?.myInvestmentsList?.map(obj => {
        obj.amountInvested = this.currency_style(obj.amountInvested);
        obj.profitMonthlyPct = this.profit_style(obj.profitMonthlyPct);
        obj.transferDate = obj.transferDate ? moment(obj.transferDate).format('DD-MMM-YYYY') : '';
        obj.firstProfitDate = obj.firstProfitDate ? moment(obj.firstProfitDate).format('DD-MMM-YYYY') : '';
        return obj;
      });
      this.sumOfTotalAmountInvested = this.currency_style(res.investmentInfo[0].investments?.myInvestmentsList?.sumOfTotalAmountInvested)
        ? this.currency_style(res.investmentInfo[0].investments?.myInvestmentsList?.sumOfTotalAmountInvested) :
        this.currency_style(0);
      this.investmentMissing = this.currency_style(res.investmentInfo[0].investments?.investmentMissing);
    });
  }

  protected onSubmit(): void {

  }

  checkProfitDisable() {
    let investmentType = this.investmentInfoForm.get('investmentType').value;
    this.title = this.currency_style(this.investmentInfo.investments?.investAmount) + ' at ';
    if (investmentType === undefined) {
      this.investmentInfoForm.get('monthlyProfit').disable();
      this.investmentInfoForm.get('annualProfit').disable();
      this.investmentInfoForm.get('endProfit').disable();
      this.title += this.profit_style(0);
    } else if (investmentType === 'Monthly Profit') {
      this.investmentInfoForm.get('monthlyProfit').enable();
      this.investmentInfoForm.get('annualProfit').disable();
      this.investmentInfoForm.get('endProfit').disable();
      this.title += this.profit_style(this.investmentInfo.investments?.profitMonthly);
    } else if (investmentType === 'Annual Profit') {
      this.investmentInfoForm.get('monthlyProfit').disable();
      this.investmentInfoForm.get('annualProfit').enable();
      this.investmentInfoForm.get('endProfit').disable();
      this.title += this.profit_style(this.investmentInfo.investments?.profitYearly);
    } else if (investmentType === 'One-time Profit') {
      this.investmentInfoForm.get('monthlyProfit').disable();
      this.investmentInfoForm.get('annualProfit').disable();
      this.investmentInfoForm.get('endProfit').enable();
      this.title += this.profit_style(this.investmentInfo.investments?.profitEnd);
    } else if (investmentType === 'Mixed') {
      this.investmentInfoForm.get('monthlyProfit').enable();
      this.investmentInfoForm.get('annualProfit').enable();
      this.investmentInfoForm.get('endProfit').enable();
      if (this.investmentInfo.investments?.profitMonthly !== 0) {
        this.title += this.profit_style(this.investmentInfo.investments?.profitMonthly);
      }
      else if (this.investmentInfo.investments?.profitYearly !== 0) {
        this.title += this.profit_style(this.investmentInfo.investments?.profitYearly);
      }
      else if (this.investmentInfo.investments?.profitEnd !== 0) {
        this.title += this.profit_style(this.investmentInfo.investments?.profitEnd);
      }
    }
  }

  /**
* on file drop handler
*/
  onFileDropped($event) {
    this.prepareFilesList($event);
  }
  /**
  * handle file from browsing
  */
  fileBrowseHandler(target) {
    let files = target?.files;
    this.prepareFilesList(files);
  }

  /**
  * Convert Files list to normal array list
  * @param files (Files List)
  */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.files.push(item);
    }
    //this.addInvestorForm.get('passportImage').setValue(this.files);

  }

  /**
 * Delete file from files list
 * @param index (File index)
 */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

}
