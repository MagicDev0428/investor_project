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
import { BalanceService } from '../service/balance.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pay-profit-env',
  templateUrl: './add-money-env.component.html',
  styleUrls: ['../adam/investorForm.scss', './add-money-env.component.scss'],
})

export class AddMoneyEnvComponent extends BaseComponent implements OnInit {
  @ViewChild(DraggableDialogComponent) dialog: DraggableDialogComponent;

  amount = '';
  section = 'CREATE';
  title = 'ADAM\'\s New Transaction';
  files: any[] = [];
  userId: any = '';
  balanceId: any = '';
  createdDate = '';
  createdBy = '';
  modifiedDate = '';
  modifiedBy = '';
  currentMonth: any = {
    month: 8,
    monthName: 'Aug',
    year: 2023
  }
  balance: any = {};
  dialogParam: any = [];

  dialogVisible: boolean = true;

  selectedInvestor$!: Observable<string | number>;
  selectedBalance$!: Observable<string | number>;
  protected payProfitForm: FormGroup;
  protected submitted = false;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private balanceService: BalanceService
  ) {
    super(router, auth, toastrService);
    this.selectedBalance$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['name']));
    this.selectedBalance$.subscribe(res => {
      this.balanceId = res;
    });
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
        transferDate: new FormControl("", Validators.required),
        transferMethod: new FormControl("Envelope", Validators.required),
        emailDate: new FormControl("",),
        description: new FormControl(""),
      });
    if(this.balanceId !== 'new') {
      this.balanceService.getBalance(this.balanceId).subscribe({
        next: (res) => {
          this.balance = res?.balances;
          this.payProfitForm.get('profitMonth').setValue(this.formatDate(this.balance?.profitMonth, 'MMM-YYYY'));
          this.payProfitForm.get('deposit').setValue(this.currency_style(this.balance?.deposit??0));
          this.payProfitForm.get('transferDate').setValue(this.formatDate(this.balance?.transferDate, 'DD-MM-YYYY')??null);
          this.payProfitForm.get('transferMethod').setValue(this.balance?.transferMethod);
          this.payProfitForm.get('emailDate').setValue(this.formatDate(this.balance?.emailDate, 'DD-MM-YYYY')??null);
          this.payProfitForm.get('description').setValue(this.balance?.description??'');
          this.createdDate = moment(this.balance?.createdDate).format('yyyy-MM-DD');
          this.balance.createdDate = this.balance?.createdDate;
          this.createdBy = this.balance?.createdBy;
          this.balance.createdBy = this.balance?.createdBy;
          this.modifiedDate = moment(this.balance?.modifiedDate).format('yyyy-MM-DD');
          this.balance.modifiedDate = this.balance?.modifiedDate;
          this.modifiedBy = this.balance?.modifiedBy;
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
    combineLatest([
      this.payProfitForm.get('transferDate').valueChanges,
      this.payProfitForm.get('deposit').valueChanges
    ]).subscribe(([value1, value2]) => {
      this.setAutoDescription();
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
    if (typeof _id !== 'undefined') {
      this.balanceService.deleteBalance(_id).subscribe({
        next: (res) => {
          this.toastrService.success('Balance was successfully deleted!');
          this.goTo('portfolio/' + this.userId);
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  selectOption(month: any) {
    this.currentMonth = month;
    this.payProfitForm.get('profitMonth').setValue(this.currentMonth.monthName + '-' + this.currentMonth.year);
  }

  checkSelect(event: Event) {
    let transferType = this.payProfitForm.get('transferMethod').value;
    if (transferType !== 'Envelope') {
      localStorage.setItem('transferType', transferType);
      this.goTo('/add-money-bank/' + this.balanceId + '/' + this.userId);
    }
  }

  setAutoDescription() {
    let description = '';
    let transferDate = this.payProfitForm.get('transferDate').value ?? 'none';
    if(this.amount) {
      description += `Add Money ${this.currency_style(this.amount)}`;
    }
    if(transferDate !== 'none') {
      description += ` ${this.calculateDateDifference(transferDate, 'YYYY-MM-DDTHH:mm')}`;
    }
    this.payProfitForm.get('description').setValue(description);
  }

  open(comp: string) {
    this.dialog.onOpen(comp);
  }

  protected onSubmit(): void {
    this.submitted = true;
    if (this.payProfitForm.valid) {
      this.balance.profitMonth = new Date(this.currentMonth.year, this.currentMonth.month-1, 1);
      this.balance.deposit = this.amount;
      this.balance.transferDate = this.payProfitForm.get('transferDate').value;
      this.balance.transferMethod = this.payProfitForm.get('transferMethod').value;
      this.balance.description = this.payProfitForm.get('description').value;
      this.balance.investorName = this.userId;
      this.balance.profitMonthPaid = false;
      this.balance.profitOtherPaid = false;

      if (this.balanceId !== 'new') {
        this.balance.modifiedBy = this.user.name;
        this.balance.modifiedDate = new Date();
        this.balanceService.updateBalance(this.balance).subscribe({
          next: (res) => {
            this.toastrService.success('Balance was successfully updated!');
            this.goTo('portfolio/' + this.userId);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        this.balance.createdBy = this.user.name;
        this.balance.createdDate = new Date();
        this.balanceService.saveBalance(this.balance).subscribe({
          next: (res) => {
            this.toastrService.success('Balance was successfully created!');
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
}
