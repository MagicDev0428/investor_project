import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";

import { FormBuilder } from '@angular/forms';
import { AdamService } from '../service/adam.service';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { MyInvestmentService } from '../service/myInvestmentService';
import { InvestmentService } from '../service/investment.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-my-investment-form',
  templateUrl: './my-investment-form.component.html',
  styleUrls: ['../adam/investorForm.scss', './my-investment-form.component.scss'],
})

export class MyInvestmentFormComponent extends BaseComponent implements OnInit {


  amount: any = 0;
  section = 'EDIT';
  title = 'New My Investment From';

  files: any[] = [];
  myInvestmentId: any = '';
  userId: any = '';
  values: any[] = [];
  investments: any = [];
  investors: any = [];
  investorsNames: any[] = [];
  to_value: string;
  from_value: string;
  nowDateTime: Date;
  investType: string = undefined;
  profit = '';
  createdDate = '';
  createdBy = '';
  modifiedDate = '';
  modifiedBy = '';

  protected myInvestmentForm: FormGroup;
  protected submitted = false;

  selectedMyInvestment$!: Observable<string | number>;
  selectedInvestor$!: Observable<string | number>;
  myInvestment: any = {
    documents: [],
    investmentNo: null,
    investorName: '',
    amountInvested: 0,
    transferDate: null,
    transactionFrom: null,
    transactionTo: null,
    transactionNo: null,
    profitMonthlyPct: 0,
    profitMonthly: 0,
    profitAnnualPct: 0,
    profitAnnual: 0,
    profitEndPct: 0,
    profitEnd: 0,
    investType: "Mixed",
    firstProfitDate: null,
    lastProfitDate: null,
    payBackDate: null,
    torbenMonthlyPct: 0,
    torbenMonthly: 0,
    torbenAnnualPct: 0,
    torbenAnnual: 0,
    torbenEndPct: 0,
    torbenEnd: 0,
    description: '',
    createdDate: null,
    createdBy: '',
    modifiedDate: null,
    modifiedBy: '',
    startDate: null
  }

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adamService: AdamService,
    private myInvestmentService: MyInvestmentService,
    private investmentService: InvestmentService
  ) {
    super(router, auth, toastrService);
    this.nowDateTime = new Date();
    this.selectedMyInvestment$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedMyInvestment$.subscribe(res => {
      this.myInvestmentId = res;
    });
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['name']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
    });
  }

  ngOnInit(): void {
    this.myInvestmentForm = this.formBuilder.group(
      {
        investmentNo: new FormControl(null, Validators.required),
        investorName: new FormControl(''),
        amountInvested: new FormControl(this.currency_style(this.myInvestment.amountInvested), Validators.required),
        transactionFrom: new FormControl(''),
        transactionTo: new FormControl(''),
        transferDate: new FormControl(null, Validators.required),
        transactionNo: new FormControl(0),
        documents: new FormControl(),
        profitMonthlyPct: new FormControl(this.profit_style(this.myInvestment.profitMonthlyPct)),
        profitMonthly: new FormControl(this.currency_style(this.myInvestment.profitMonthly)),
        profitAnnualPct: new FormControl(this.profit_style(this.myInvestment.profitAnnualPct)),
        profitAnnual: new FormControl(this.currency_style(this.myInvestment.profitAnnual)),
        profitEndPct: new FormControl(this.profit_style(this.myInvestment.profitEndPct)),
        profitEnd: new FormControl(this.currency_style(this.myInvestment.profitEnd)),
        investType: new FormControl(),
        firstProfitDate: new FormControl(null, Validators.required),
        lastProfitDate: new FormControl(null, Validators.required),
        payBackDate: new FormControl(null),
        torbenMonthlyPct: new FormControl(this.profit_style(this.myInvestment.torbenMonthlyPct)),
        torbenMonthly: new FormControl(this.currency_style(this.myInvestment.torbenMonthly)),
        torbenAnnualPct: new FormControl(this.profit_style(this.myInvestment.torbenAnnualPct)),
        torbenAnnual: new FormControl(this.currency_style(this.myInvestment.torbenAnnual)),
        torbenEndPct: new FormControl(this.profit_style(this.myInvestment.torbenEndPct)),
        torbenEnd: new FormControl(this.currency_style(this.myInvestment.torbenEnd)),
        description: new FormControl(),
      });
    this.myInvestmentForm.addValidators([this.profitValidator]);

    if (this.myInvestmentId !== 'new') {
      this.myInvestmentService.getMyInvestment(this.myInvestmentId).subscribe({
        next: (res) => {
          this.values = res.myInvestments;
          this.myInvestment.amountInvested = this.values['amountInvested'] ?? 0;
          this.changeStyle(this.myInvestment.amountInvested, 'amountInvested');
          this.myInvestment.profitMonthly = this.values['profitMonthly'] ?? 0;
          this.changeStyle(this.myInvestment.profitMonthly, 'profitMonthly');
          this.myInvestment.profitAnnual = this.values['profitAnnual'] ?? 0;
          this.changeStyle(this.myInvestment.profitAnnual, 'profitAnnual');
          this.myInvestment.profitEnd = this.values['profitEnd'] ?? 0;
          this.changeStyle(this.myInvestment.profitEnd, 'profitEnd');
          this.myInvestment.torbenMonthly = this.values['torbenMonthly'] ?? 0;
          this.changeStyle(this.myInvestment.torbenMonthly, 'torbenMonthly');
          this.myInvestment.torbenAnnual = this.values['torbenAnnual'] ?? 0;
          this.changeStyle(this.myInvestment.torbenAnnual, 'torbenAnnual');
          this.myInvestment.torbenEnd = this.values['torbenEnd'] ?? 0;
          this.changeStyle(this.myInvestment.torbenEnd, 'torbenEnd');
          this.myInvestmentForm.get('investmentNo').setValue(this.values['investmentNo']);
          this.myInvestmentForm.get('investorName').setValue(this.values['investorName']);
          this.myInvestmentForm.get('transactionFrom').setValue(this.values['transactionFrom']);
          this.myInvestmentForm.get('transactionTo').setValue(this.values['transactionTo']);
          if (this.values['transferDate']) {
            this.myInvestmentForm.get('transferDate').setValue(moment(this.values['transferDate']).format('DD-MM-YYYY'));
          }
          this.myInvestmentForm.get('transactionNo').setValue(this.values['transactionNo']);
          this.myInvestmentForm.get('investType').setValue(this.values['investType']);
          this.investType = this.values['investType'];
          this.myInvestmentForm.get('profitMonthlyPct').setValue(this.profit_style(this.values['profitMonthlyPct']));
          this.myInvestment.profitMonthlyPct = this.values['profitMonthlyPct'] ?? 0;
          this.myInvestmentForm.get('profitAnnualPct').setValue(this.profit_style(this.values['profitAnnualPct']));
          this.myInvestment.profitAnnualPct = this.values['profitAnnualPct'] ?? 0;
          this.myInvestmentForm.get('profitEndPct').setValue(this.profit_style(this.values['profitEndPct']));
          this.myInvestment.profitEndPct = this.values['profitEndPct'] ?? 0;
          if (this.values['firstProfitDate']) {
            this.myInvestmentForm.get('firstProfitDate').setValue(moment(this.values['firstProfitDate']).format('DD-MM-YYYY'));
          }
          if (this.values['lastProfitDate']) {
            this.myInvestmentForm.get('lastProfitDate').setValue(moment(this.values['lastProfitDate']).format('DD-MM-YYYY'));
          }
          if (this.values['payBackDate']) {
            // this.myInvestmentForm.get('payBackDate').setValue(moment(this.values['payBackDate']).format('DD-MM-YYYY'));
          } else {
            this.myInvestmentForm.get('payBackDate').setValue('6 months notice');
          }
          this.myInvestmentForm.get('torbenMonthlyPct').setValue(this.profit_style(this.values['torbenMonthlyPct']));
          this.myInvestment.torbenMonthlyPct = this.values['profitEndPct'] ?? 0;
          this.myInvestmentForm.get('torbenAnnualPct').setValue(this.profit_style(this.values['torbenAnnualPct']));
          this.myInvestment.torbenAnnualPct = this.values['torbenAnnualPct'] ?? 0;
          this.myInvestmentForm.get('torbenEndPct').setValue(this.profit_style(this.values['torbenEndPct']));
          this.myInvestment.torbenEndPct = this.values['torbenEndPct'] ?? 0;
          this.myInvestmentForm.get('description').setValue(this.values['description']);
          this.createdDate = moment(this.values['createdDate']).format('yyyy-MM-DD');
          this.myInvestment.createdDate = this.values['createdDate'];
          this.createdBy = this.values['createdBy'];
          this.myInvestment.createdBy = this.values['createdBy'];
          this.modifiedDate = moment(this.values['modifiedDate']).format('yyyy-MM-DD');
          this.myInvestment.modifiedDate = this.values['modifiedDate'];
          this.modifiedBy = this.values['modifiedBy'];
          this.myInvestment.modifiedBy = this.values['modifiedBy'];
          this.section = 'EDIT';
          this.checkProfitDisable();
        },
        error: err => {
          console.error('An error occurred :', err);
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    } else {
      this.section = 'CREATE';
      this.myInvestmentForm.get('transferDate').valueChanges.subscribe(newValue => {
        // Perform actions when the value of myControl in myForm is changed
        this.setAutoDate(newValue);
      });
      combineLatest([
        this.myInvestmentForm.get('transferDate').valueChanges,
        this.myInvestmentForm.get('payBackDate').valueChanges,
        this.myInvestmentForm.get('amountInvested').valueChanges,
        this.myInvestmentForm.get('investType').valueChanges,
        this.myInvestmentForm.get('profitMonthlyPct').valueChanges,
        this.myInvestmentForm.get('profitAnnualPct').valueChanges,
        this.myInvestmentForm.get('profitEndPct').valueChanges,
      ]).subscribe(([value1, value2, value3, value4, value5, value6, value7]) => {
        this.setAutoDescription();
      });
    }
    if (typeof this.userId !== 'undefined') {
      this.myInvestmentForm.get('investorName').setValue(this.userId);
    }

    this.adamService.getAdamInvestors().subscribe((res) => {
      this.investors = res.adams.investorsNames;
      this.investments = res.adams.investments.map(obj => {
        if (obj._id === undefined) {
          obj._id = ""
        }
        if (obj.explanation === undefined) {
          obj.explanation = ""
        }
        if (this.myInvestmentId === 'new') {
          this.myInvestmentForm.get('payBackDate').setValue('6 months notice');
        }
        return obj;
      });
    });
    this.title += ' ' + this.userId;
    this.checkProfitDisable();
  }

  profitValidator = (form: FormGroup) => {
    const investType = form.get('investType').value?.replace(/%/g, '');
    const profitMonthly = form.get('profitMonthlyPct').value?.replace(/%/g, '');
    const profitYearly = form.get('profitAnnualPct').value?.replace(/%/g, '');
    const profitEnd = form.get('profitEndPct').value?.replace(/%/g, '');
    let valid = false;

    if (investType === 'Monthly Profit') {
      if (profitMonthly === '') {
        valid = false;
        return valid ? null : { monthlyRequired: "true" };
      }
      if (Number(profitMonthly?.replace(/%/g, '')) > 100 || Number(profitMonthly?.replace(/%/g, '')) < 0.01) {
        valid = false;
        return valid ? null : { monthlyExceed: "true" };
      }
    } if (investType === 'Annual Profit') {
      if (profitYearly === '') {
        valid = false;
        return valid ? null : { yearlyRequired: "true" };
      }
      if (Number(profitYearly?.replace(/%/g, '')) > 100 || Number(profitYearly?.replace(/%/g, '')) < 0.01) {
        valid = false;
        return valid ? null : { yearlyExceed: "true" };
      }
    } else if (investType === 'One-time Profit') {
      if (profitEnd === '') {
        valid = false;
        return valid ? null : { endRequired: "true" };
      }
      if (Number(profitEnd?.replace(/%/g, '')) > 100 || Number(profitEnd?.replace(/%/g, '')) < 0.01) {
        valid = false;
        return valid ? null : { endExceed: "true" };
      }
    } else if (investType === 'Mixed') {
      if (profitMonthly === '' && profitYearly === '' && profitEnd === '') {
        valid = false;
        return valid ? null : { anyoneRequired: "true" };
      }
      if (profitMonthly !== '') {

        if (Number(profitMonthly?.replace(/%/g, '')) > 100 || Number(profitMonthly?.replace(/%/g, '')) < 0.01) {
          valid = false;
          return valid ? null : { monthlyExceed: "true" };
        }
      }
      if (profitYearly !== '') {
        if (Number(profitYearly?.replace(/%/g, '')) > 100 || Number(profitYearly?.replace(/%/g, '')) < 0.01) {
          valid = false;
          return valid ? null : { yearlyExceed: "true" };
        }
      }
      if (profitEnd !== '') {
        if (Number(profitEnd?.replace(/%/g, '')) > 100 || Number(profitEnd?.replace(/%/g, '')) < 0.01) {
          valid = false;
          return valid ? null : { endExceed: "true" };
        }
      }
    }

    return null;
  };

  onSelectChange(event: any) {
    this.investType = event.target.value;
    this.checkProfitDisable();
  }

  checkProfitDisable() {
    if (this.investType === undefined) {
      this.myInvestmentForm.get('profitMonthlyPct').disable();
      this.myInvestmentForm.get('profitAnnualPct').disable();
      this.myInvestmentForm.get('profitEndPct').disable();
      this.myInvestmentForm.get('profitMonthly').disable();
      this.myInvestmentForm.get('profitAnnual').disable();
      this.myInvestmentForm.get('profitEnd').disable();
    } else if (this.investType === 'Monthly Profit') {
      this.myInvestmentForm.get('profitMonthlyPct').enable();
      this.myInvestmentForm.get('profitAnnualPct').disable();
      this.myInvestmentForm.get('profitEndPct').disable();
      this.myInvestmentForm.get('profitMonthly').enable();
      this.myInvestmentForm.get('profitAnnual').disable();
      this.myInvestmentForm.get('profitEnd').disable();
    } else if (this.investType === 'Annual Profit') {
      this.myInvestmentForm.get('profitMonthlyPct').disable();
      this.myInvestmentForm.get('profitAnnualPct').enable();
      this.myInvestmentForm.get('profitEndPct').disable();
      this.myInvestmentForm.get('profitMonthly').disable();
      this.myInvestmentForm.get('profitAnnual').enable();
      this.myInvestmentForm.get('profitEnd').disable();
    } else if (this.investType === 'One-time Profit') {
      this.myInvestmentForm.get('profitMonthlyPct').disable();
      this.myInvestmentForm.get('profitAnnualPct').disable();
      this.myInvestmentForm.get('profitEndPct').enable();
      this.myInvestmentForm.get('profitMonthly').disable();
      this.myInvestmentForm.get('profitAnnual').disable();
      this.myInvestmentForm.get('profitEnd').enable();
    } else if (this.investType === 'Mixed') {
      this.myInvestmentForm.get('profitMonthlyPct').enable();
      this.myInvestmentForm.get('profitAnnualPct').enable();
      this.myInvestmentForm.get('profitEndPct').enable();
      this.myInvestmentForm.get('profitMonthly').enable();
      this.myInvestmentForm.get('profitAnnual').enable();
      this.myInvestmentForm.get('profitEnd').enable();
    }
  }

  changeStyle(value: any, name: string) {
    this.myInvestmentForm.get(name).setValue(this.currency_style(value));
  }

  onInputChange(event: any) {
    let id = event.target.id;
    if (id === 'amountInvested' || id === 'profitMonthly' || id === 'profitAnnual' || id === 'profitEnd' || id === 'torbenMonthly'
      || id === 'torbenAnnual' || id === 'torbenEnd') {
      this.myInvestment[id] = Number(event.target.value.replace(/\D/g, ''));
      this.changeStyle(this.myInvestment[id], id);
      this.setAutoAmount(id, this.myInvestment[id]);
      if(id !== 'amountInvested') {
        this.setAutoPercent(id, this.myInvestment[id]);
      }
    }
    if (id === 'profitMonthlyPct' || id === 'profitAnnualPct' || id === 'profitEndPct' || id === 'torbenMonthlyPct' ||
      id === 'torbenAnnualPct' || id === 'profitEndPct' || id === 'torbenEndPct') {
      this.myInvestment[id] = event.target.value?.replace(/%/g, '');
      this.myInvestmentForm.get(id).setValue(this.myInvestment[id] + '%');
      this.setAutoPercent(id, this.myInvestment[id])
      this.setAutoAmount(id, this.myInvestment[id]);
    }
  }

  deleteTransaction(_id: any) {
    if (typeof _id !== 'undefined') {
      this.myInvestmentService.deleteMyInvestment(_id).subscribe({
        next: (res) => {
          this.toastrService.success('MyInvestment was successfully deleted!');
          this.goTo('portfolio/' + this.userId);
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  //set Auto First Profit Date
  setAutoDate(value: string) {
    const transferMoment = moment(value, 'YYYY-MM-DDTHH:mm'); // Parse the transfer date using the specified format
    const firstProfitDate = transferMoment.clone().add(1, 'months').date(15); // Add 1 month and set the date to 15th
    if (transferMoment.date() > 15) {
      firstProfitDate.add(1, 'months'); // If transfer date is on or after 15th, add another month
    }
    let result = firstProfitDate.format('DD-MM-YYYY');
    this.myInvestmentForm.get('firstProfitDate').setValue(result);
    // return firstProfitDate.format('D MMMM');
  }

  setAutoDescription() {
    let transferDate = this.myInvestmentForm.get('transferDate').value ?? 'none';
    let payBackDate = this.myInvestmentForm.get('payBackDate').value ?? 'none';
    let amount = this.myInvestmentForm.get('amountInvested').value ?? 0;
    let description = '';
    if ((transferDate !== 'none') && (payBackDate !== 'none')) {
      description += this.getYearsMonthsString(transferDate, payBackDate, 'YYYY-MM-DDTHH:mm');
      if (this.investType === 'Monthly Profit') {
        let profitMonthlyPct = this.myInvestmentForm.get('profitMonthlyPct').value ?? '0.00%';
        description += ` ${amount} at ${profitMonthlyPct} pr Month`;
      } else if (this.investType === 'Annual Profit') {
        let profitAnnualPct = this.myInvestmentForm.get('profitAnnualPct').value ?? '0.00%';
        description += ` ${amount} at ${profitAnnualPct} pr Year`;
      } else if (this.investType === 'One-time Profit') {
        let profitEndPct = this.myInvestmentForm.get('profitEndPct').value ?? '0.00%';
        description += ` ${amount} at ${profitEndPct} pr One Time`;
      } else if (this.investType === 'Mixed') {
        let profitMonthlyPct = this.myInvestmentForm.get('profitMonthlyPct').value ?? '0.00%';
        let profitAnnualPct = this.myInvestmentForm.get('profitAnnualPct').value ?? '0.00%';
        let profitEndPct = this.myInvestmentForm.get('profitEndPct').value ?? '0.00%';
        description += ` ${amount} at ${profitMonthlyPct} pr Month, ${profitAnnualPct} pr Year, at ${profitEndPct} pr One Time`;
      }
    }
    this.myInvestmentForm.get('description').setValue(description);
  }

  setAutoAmount(id, value) {
    if (id !== 'amountInvested') {
    let value_id = id.replace("Pct", "");
    let amount = this.myInvestment.amountInvested;
    this.myInvestment[value_id] = value * amount / 100;
    this.myInvestmentForm.get(value_id).setValue(this.currency_style(this.myInvestment[value_id]));
    } else {
      this.myInvestment['profitMonthly'] = this.myInvestment['profitMonthlyPct'] * value / 100;
      this.myInvestmentForm.get('profitMonthly').setValue(this.currency_style(this.myInvestment['profitMonthly']));
      this.myInvestment['profitAnnual'] = this.myInvestment['profitAnnualPct'] * value / 100;
      this.myInvestmentForm.get('profitAnnual').setValue(this.currency_style(this.myInvestment['profitAnnual']));
      this.myInvestment['profitEnd'] = this.myInvestment['profitEndPct'] * value / 100;
      this.myInvestmentForm.get('profitEnd').setValue(this.currency_style(this.myInvestment['profitEnd']));
      this.myInvestment['torbenMonthly'] = this.myInvestment['torbenMonthlyPct'] * value / 100;
      this.myInvestmentForm.get('torbenMonthly').setValue(this.currency_style(this.myInvestment['torbenMonthly']));
      this.myInvestment['torbenAnnual'] = this.myInvestment['torbenAnnualPct'] * value / 100;
      this.myInvestmentForm.get('torbenAnnual').setValue(this.currency_style(this.myInvestment['torbenAnnual']));
      this.myInvestment['torbenEnd'] = this.myInvestment['torbenEndPct'] * value / 100;
      this.myInvestmentForm.get('torbenEnd').setValue(this.currency_style(this.myInvestment['torbenEnd']));
    }
  }

  setAutoPercent(id, value) {
    if (id !== 'amountInvested') {
    let value_id = id + "Pct";
    let amount = this.myInvestment.amountInvested;
    this.myInvestment[value_id] = value / amount * 100;
    this.myInvestmentForm.get(value_id).setValue(this.profit_style(this.myInvestment[value_id]));
    } else {
      this.myInvestment['profitMonthlyPct'] = this.myInvestment['profitMonthly'] / value * 100;
      this.myInvestmentForm.get('profitMonthlyPct').setValue(this.profit_style(this.myInvestment['profitMonthlyPct']));
      this.myInvestment['profitAnnualPct'] = this.myInvestment['profitAnnual'] / value * 100;
      this.myInvestmentForm.get('profitAnnualPct').setValue(this.profit_style(this.myInvestment['profitAnnualPct']));
      this.myInvestment['profitEndPct'] = this.myInvestment['profitEnd'] / value * 100;
      this.myInvestmentForm.get('profitEndPct').setValue(this.profit_style(this.myInvestment['profitEndPct']));
      this.myInvestment['torbenMonthlyPct'] = this.myInvestment['torbenMonthly'] / value * 100;
      this.myInvestmentForm.get('torbenMonthlyPct').setValue(this.profit_style(this.myInvestment['torbenMonthlyPct']));
      this.myInvestment['torbenAnnualPct'] = this.myInvestment['torbenAnnual'] / value * 100;
      this.myInvestmentForm.get('torbenAnnualPct').setValue(this.profit_style(this.myInvestment['torbenAnnualPct']));
      this.myInvestment['torbenEndPct'] = this.myInvestment['torbenEnd'] / value * 100;
      this.myInvestmentForm.get('torbenEndPct').setValue(this.profit_style(this.myInvestment['torbenEndPct']));
    }
  }

  getInvestInfo(event: any) {
    let investmentId = event.target.value;
    this.investmentService.getInvestment(investmentId).subscribe({
      next: (res) => {
        let payBackDate = res?.investments?.endDate;
        if (payBackDate) {
          this.myInvestmentForm.get('payBackDate').setValue(moment(payBackDate).format('DD-MM-YYYY'));
          this.myInvestmentForm.get('lastProfitDate').setValue(moment(payBackDate).format('DD-MM-YYYY'));
        }
        this.myInvestmentForm.get('investType').setValue(res?.investments?.investType);
        this.investType = res?.investments?.investType;
        this.myInvestmentForm.get('profitMonthlyPct').setValue(this.profit_style(res?.investments?.profitMonthly));
        this, this.myInvestment.profitMonthlyPct = res?.investments?.profitMonthly ?? 0;
        this.setAutoAmount('profitMonthlyPct', this.myInvestment['profitMonthlyPct']);
        this.myInvestmentForm.get('profitAnnualPct').setValue(this.profit_style(res?.investments?.profitYearly));
        this, this.myInvestment.profitAnnualPct = res?.investments?.profitYearly ?? 0;
        this.setAutoAmount('profitAnnualPct', this.myInvestment['profitAnnualPct']);
        this.myInvestmentForm.get('profitEndPct').setValue(this.profit_style(res?.investments?.profitEnd));
        this, this.myInvestment.profitEndPct = res?.investments?.profitEnd ?? 0;
        this.setAutoAmount('profitEndPct', this.myInvestment['profitEndPct']);
        this.setAutoDescription();
        this.checkProfitDisable();
      },
      error: err => {
        console.error('An error occurred :', err);
        this.toastrService.error(err);
      },
      complete: () => console.log('There are no more action happen.')
    });
  }

  protected onSubmit(): void {
    this.submitted = true;
    if (this.myInvestmentForm.valid) {
      this.myInvestment.investmentNo = this.myInvestmentForm.get('investmentNo').value;
      this.myInvestment.investorName = this.myInvestmentForm.get('investorName').value;
      this.myInvestment.transferDate = this.myInvestmentForm.get('transferDate').value ?? null;
      this.myInvestment.transactionFrom = this.myInvestmentForm.get('transactionFrom').value;
      this.myInvestment.transactionTo = this.myInvestmentForm.get('transactionTo').value;
      this.myInvestment.transactionNo = this.myInvestmentForm.get('transactionNo').value;
      this.myInvestment.investType = this.myInvestmentForm.get('investType').value;
      this.myInvestment.firstProfitDate = this.myInvestmentForm.get('firstProfitDate').value;
      this.myInvestment.lastProfitDate = this.myInvestmentForm.get('lastProfitDate').value;
      this.myInvestment.payBackDate = this.myInvestmentForm.get('payBackDate').value;
      this.myInvestment.description = this.myInvestmentForm.get('description').value;

      if (this.myInvestmentId !== 'new') {
        this.myInvestment._id = this.myInvestmentId;
        this.myInvestment.modifiedBy = this.user.name;
        this.myInvestment.modifiedDate = new Date();
        this.myInvestmentService.updateMyInvestment(this.myInvestment).subscribe({
          next: (res) => {
            this.toastrService.success('MyInvestment was successfully updated!');
            this.goTo('portfolio/' + this.userId);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        this.myInvestment.createdBy = this.user.name;
        this.myInvestment.createdDate = new Date();
        this.myInvestmentService.createMyInvestment(this.myInvestment).subscribe({
          next: (res) => {
            this.toastrService.success('MyInvestment was successfully created!');
            this.goTo('portfolio/' + this.userId);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
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
  }

  /**
  * Delete file from files list
  * @param index (File index)
  */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

}
