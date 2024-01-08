import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Adam } from '../model/adam';
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
import { MyInvestment } from '../model/myInvestment';
import { MyInvestmentService } from '../service/myInvestmentService';

@Component({
  selector: 'app-my-investment-form',
  templateUrl: './my-investment-form.component.html',
  styleUrls: ['../adam/investorForm.scss', './my-investment-form.component.scss'],
})

export class MyInvestmentFormComponent extends BaseComponent implements OnInit {


  amount = '';
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
  myInvestment: MyInvestment = {
    investmentNo: 0,
    investorName: '',
    amountInvested: '',
    transferDate: new Date,
    transactionFrom: '',
    transactionTo: '',
    transactionNo: '',
    documents: [],
    profitMonthly: 0,
    profitYearly: 0,
    profitEnd: 0,
    investType: '',
    firstProfitDate: new Date,
    lastProfitDate: new Date,
    payBackDate: 0,
    torbenMonthly: 0,
    torbenYearly: 0,
    torbenEnd: 0,
    description: '',
    createdDate: new Date,
    createdBy: '',
    modifiedDate: new Date,
    modifiedBy: '',
  }

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adamService: AdamService,
    private myInvestmentService: MyInvestmentService,
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
        investmentNo: new FormControl(),
        investorName: new FormControl(),
        amountInvested: new FormControl(),
        transactionFrom: new FormControl(),
        transactionTo: new FormControl(),
        transferDate: new FormControl(),
        transactionNo: new FormControl(),
        documents: new FormControl(),
        profitMonthly: new FormControl(),
        profitYearly: new FormControl(),
        profitEnd: new FormControl(),
        investType: new FormControl(),
        firstProfitDate: new FormControl(),
        lastProfitDate: new FormControl(),
        payBackDate: new FormControl(),
        torbenMonthly: new FormControl(),
        torbenYearly: new FormControl(),
        torbenEnd: new FormControl(),
        description: new FormControl(),
      });
    this.myInvestmentForm.addValidators([this.profitValidator]);

    if (this.myInvestmentId !== 'new') {
      this.myInvestmentService.getMyInvestment(this.myInvestmentId).subscribe({
        next: (res) => {
          this.values = res.investments;
          this.amount = this.values['amountInvested'];
          this.changeStyle(this.amount);
          this.myInvestmentForm.get('investmentNo').setValue(moment(this.values['investmentNo']));
          this.myInvestmentForm.get('investorName').setValue(moment(this.values['investorName']));
          this.myInvestmentForm.get('transactionFrom').setValue(this.values['transactionFrom']);
          this.myInvestmentForm.get('transactionTo').setValue(this.values['transactionTo']);
          this.myInvestmentForm.get('transferDate').setValue(moment(this.values['transferDate']).format('yyyy-MM-DD'));
          this.myInvestmentForm.get('transactionNo').setValue(this.values['transactionNo']);
          this.myInvestmentForm.get('investType').setValue(this.values['investType']);
          this.investType = this.values['investType'];
          this.myInvestmentForm.get('profitMonthly').setValue(this.profit_style(this.values['profitMonthly']));
          this.myInvestmentForm.get('profitYearly').setValue(this.profit_style(this.values['profitYearly']));
          this.myInvestmentForm.get('profitEnd').setValue(this.profit_style(this.values['profitEnd']));
          this.myInvestmentForm.get('firstProfitDate').setValue(moment(this.values['firstProfitDate']).format('yyyy-MM-DD'));
          this.myInvestmentForm.get('lastProfitDate').setValue(moment(this.values['lastProfitDate']).format('yyyy-MM-DD'));
          this.myInvestmentForm.get('payBackDate').setValue(moment(this.values['payBackDate']).format('yyyy-MM-DD'));
          this.myInvestmentForm.get('torbenMonthly').setValue(this.profit_style(this.values['torbenMonthly']));
          this.myInvestmentForm.get('torbenYearly').setValue(this.profit_style(this.values['torbenYearly']));
          this.myInvestmentForm.get('torbenEnd').setValue(this.profit_style(this.values['torbenEnd']));
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
        return obj;
      });
    });
    this.title += ' ' + this.userId;
    this.checkProfitDisable();
  }

  profitValidator = (form: FormGroup) => {
    const investType = form.get('investType').value?.replace(/%/g, '');
    const profitMonthly = form.get('profitMonthly').value?.replace(/%/g, '');
    const profitYearly = form.get('profitYearly').value?.replace(/%/g, '');
    const profitEnd = form.get('profitEnd').value?.replace(/%/g, '');
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
      this.myInvestmentForm.get('profitMonthly').disable();
      this.myInvestmentForm.get('profitYearly').disable();
      this.myInvestmentForm.get('profitEnd').disable();
    } else if (this.investType === 'Monthly Profit') {
      this.myInvestmentForm.get('profitMonthly').enable();
      this.myInvestmentForm.get('profitYearly').disable();
      this.myInvestmentForm.get('profitEnd').disable();
    } else if (this.investType === 'Annual Profit') {
      this.myInvestmentForm.get('profitMonthly').disable();
      this.myInvestmentForm.get('profitYearly').enable();
      this.myInvestmentForm.get('profitEnd').disable();
    } else if (this.investType === 'One-time Profit') {
      this.myInvestmentForm.get('profitMonthly').disable();
      this.myInvestmentForm.get('profitYearly').disable();
      this.myInvestmentForm.get('profitEnd').enable();
    } else if (this.investType === 'Mixed') {
      this.myInvestmentForm.get('profitMonthly').enable();
      this.myInvestmentForm.get('profitYearly').enable();
      this.myInvestmentForm.get('profitEnd').enable();
    }
  }

  changeStyle(value: any) {
    this.myInvestmentForm.get('amountInvested').setValue(this.currency_style(value));
  }

  onInputChange(event: any) {
    let id = event.target.id;
    if (id === 'amountInvested') {
      this.amount = event.target.value.replace(/\D/g, '');
      this.changeStyle(this.amount);
    } else if (id === 'profitMonthly' || id === 'profitYearly' || id === 'profitEnd' || id === 'torbenMonthly' ||
      id === 'torbenYearly' || id === 'torbenEnd') {
      this.profit = event.target.value?.replace(/%/g, '');
      this.myInvestmentForm.get(id).setValue(this.profit + '%');
    }
  }

  deleteTransaction(_id: any) {
    if (typeof _id !== 'undefined') {
      this.myInvestmentService.deleteMyInvestment(_id).subscribe({
        next: (res) => {
          this.toastrService.success('MyInvestment was successfully deleted!');
          // this.router.navigate(['/investment-list/']);
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  protected onSubmit(): void {
    this.submitted = true;
    if (this.myInvestmentForm.valid) {
      this.myInvestment.investmentNo = this.myInvestmentForm.get('investmentNo').value;
      this.myInvestment.investorName = this.myInvestmentForm.get('investorName').value;
      this.myInvestment.amountInvested = this.amount?.toString().replace(/\D/g, '');
      this.myInvestment.transferDate = this.myInvestmentForm.get('transferDate').value;
      this.myInvestment.transactionFrom = this.myInvestmentForm.get('transactionFrom').value;
      this.myInvestment.transactionTo = this.myInvestmentForm.get('transactionTo').value;
      this.myInvestment.transactionNo = this.myInvestmentForm.get('transactionNo').value;
      this.myInvestment.profitMonthly = this.myInvestmentForm.get('profitMonthly').value?.replace(/%/g, '');
      this.myInvestment.profitYearly = this.myInvestmentForm.get('profitYearly').value?.replace(/%/g, '');
      this.myInvestment.profitEnd = this.myInvestmentForm.get('profitEnd').value?.replace(/%/g, '');
      this.myInvestment.investType = this.myInvestmentForm.get('investType').value;
      this.myInvestment.firstProfitDate = this.myInvestmentForm.get('firstProfitDate').value;
      this.myInvestment.lastProfitDate = this.myInvestmentForm.get('lastProfitDate').value;
      this.myInvestment.payBackDate = this.myInvestmentForm.get('payBackDate').value;
      this.myInvestment.torbenMonthly = this.myInvestmentForm.get('torbenMonthly').value?.replace(/%/g, '');
      this.myInvestment.torbenYearly = this.myInvestmentForm.get('torbenYearly').value?.replace(/%/g, '');
      this.myInvestment.torbenEnd = this.myInvestmentForm.get('torbenEnd').value?.replace(/%/g, '');
      this.myInvestment.description = this.myInvestmentForm.get('description').value;

      if (this.myInvestmentId !== 'new') {
        this.myInvestment.modifiedBy = this.user.name;
        this.myInvestment.modifiedDate = new Date();
        this.myInvestmentService.updateMyInvestment(this.myInvestment).subscribe({
          next: (res) => {
            this.toastrService.success('MyInvestment was successfully updated!');

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
            // this.goList();
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
