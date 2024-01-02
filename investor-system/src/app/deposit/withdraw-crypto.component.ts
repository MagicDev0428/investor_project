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
  selector: 'app-pay-profit-bank',
  templateUrl: './withdraw-crypto.component.html',
  styleUrls: ['../adam/investorForm.scss', './withdraw-crypto.component.scss'],
})

export class WithdrawCryptoComponent extends BaseComponent implements OnInit {
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
    this.payProfitForm = this.formBuilder.group(
      {
        withdrawMonth: new FormControl("", Validators.required),
        withdraw: new FormControl("", Validators.required),
        transferDate: new FormControl(new Date(), Validators.required),
        transferType: new FormControl("", Validators.required),
        description: new FormControl(""),
        transferInfo: new FormControl(""),
        transferFrom: new FormControl(""),
        transferTo: new FormControl(""),
        transactionNo: new FormControl(""),
        documents: new FormControl(""),
      });
  }

  changeStyle(value: any) {
    this.payProfitForm.get('withdraw').setValue(this.currency_style(value));
  }

  onInputChange(event: any) {
    this.amount = event.target.value.replace(/\D/g, '');
    this.changeStyle(this.amount);
  }

  deleteTransaction(_id: any) {

  }

  checkSelect() {

  }

  protected onSubmit(): void {
    this.submitted = true;

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
    //this.adamForm.get('passportImage').setValue(this.files);

  }

  /**
  * Delete file from files list
  * @param index (File index)
  */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  selectOption(month: any) {
    this.currentMonth = month;
    this.payProfitForm.get('withdrawMonth').setValue(this.currentMonth.monthName + '-' + this.currentMonth.year);
  }

}
