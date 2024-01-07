import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";

import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { DraggableDialogComponent } from '../components/draggable-dialog/draggable-dialog.component';

@Component({
  selector: 'app-pay-profit-env',
  templateUrl: './pay-profit-env.component.html',
  styleUrls: ['../adam/investorForm.scss', './pay-profit-env.component.scss'],
})

export class PayProfitEnvComponent extends BaseComponent implements OnInit {
  @ViewChild(DraggableDialogComponent) dialog: DraggableDialogComponent;

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
  dialogParam: any = [];

  dialogVisible: boolean = true;

  selectedInvestor$!: Observable<string | number>;
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
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
      this.dialogParam.userId = this.userId;
    });
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
    if (transferType !== 'Envelope') {
      localStorage.setItem('transferType', transferType);
      this.goTo('/pay-profit-bank/' + this.userId);
    }
  }

  open(comp: string) {
    this.dialog.onOpen(comp);
  }

  protected onSubmit(): void {
    this.submitted = true;
  }
}
