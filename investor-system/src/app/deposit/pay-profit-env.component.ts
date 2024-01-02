import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-pay-profit-env',
  templateUrl: './pay-profit-env.component.html',
  styleUrls: ['../adam/investorForm.scss', './pay-profit-env.component.scss'],
})

export class PayProfitEnvComponent extends BaseComponent implements OnInit {
  @ViewChild('transactionFrom') transactionFrom: ElementRef;
  @ViewChild('transactionTo') transactionTo: ElementRef;

  amount = '';
  section = 'CREATE';
  title = 'ADAM\'\s New Transaction';
  files: any[] = [];
  userId: any = '';
  values: any[] = [];
  investments: any[] = [];
  investorsNames: any[] = [];
  to_value: string;
  from_value: string;
  nowDateTime: Date;
  createdDate = '';
  createdBy = '';
  modifiedDate = '';
  modifiedBy = '';
  currentMonth: any = {
    month: 8,
    monthName: 'Aug',
    year: '2023'
  }

  protected payProfitForm: FormGroup;
  protected submitted = false;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    super(router, auth, toastrService);
    this.nowDateTime = new Date();
  }

  ngOnInit(): void {
    this.currentMonth.monthName = moment(new Date()).format('MMM');
    this.currentMonth.month = moment(new Date()).format('MM');
    this.currentMonth.year = moment(new Date()).format('YYYY');
    this.payProfitForm = this.formBuilder.group(
      {
        profitMonth: new FormControl(this.currentMonth.monthName + '-' + this.currentMonth.year, Validators.required),
        deposit: new FormControl("", Validators.required),
        transferDate: new FormControl(new Date(), Validators.required),
        transferType: new FormControl("Envelope", Validators.required),
        description: new FormControl(),
      });
  }

  changeStyle(value: any) {
    this.payProfitForm.get('deposit').setValue(this.currency_style(value));
  }

  onInputChange(event: any) {
    this.amount = event.target.value.replace(/\D/g, '');
    this.changeStyle(this.amount);
  }

  deleteTransaction(_id: any) {

  }

  selectOption(month: any) {
    this.currentMonth = month;
    this.payProfitForm.get('profitMonth').setValue(this.currentMonth.monthName + '-' + this.currentMonth.year);
  }

  checkSelect(event: Event) {
    let transferType = this.payProfitForm.get('transferType').value;
    if (transferType === 'Thai Bank') {
      this.goTo('pay-profit-bank');
    }
  }

  protected onSubmit(): void {
    this.submitted = true;
  }
}
