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
import { DraggableDialogComponent } from '../components/draggable-dialog/draggable-dialog.component';

@Component({
  selector: 'app-pay-profit-bank',
  templateUrl: './pay-profit-bank.component.html',
  styleUrls: ['../adam/investorForm.scss', './pay-profit-bank.component.scss'],
})

export class PayProfitBankComponent extends BaseComponent implements OnInit {
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
  transferType = 'Thai Bank';

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
    this.transferType = localStorage.getItem('transferType');
    this.payProfitForm = this.formBuilder.group(
      {
        profitMonth: new FormControl("", Validators.required),
        deposit: new FormControl("", Validators.required),
        transferDate: new FormControl(new Date(), Validators.required),
        transferType: new FormControl(this.transferType, Validators.required),
        description: new FormControl(""),
        transferInfo: new FormControl(""),
        transferFrom: new FormControl(""),
        transferTo: new FormControl(""),
        transactionNo: new FormControl(""),
        documents: new FormControl(""),
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

  open(comp: string) {
    this.dialog.onOpen(comp);
  }

  checkSelect(event: Event) {
    let transferType = this.payProfitForm.get('transferType').value;
    if (transferType === 'Envelope') {
      this.goTo('/pay-profit-env/' + this.userId);
    }
    localStorage.setItem('transferType', transferType);
    this.payProfitForm.get('transferType').setValue(transferType);
    this.transferType = transferType;
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
    this.payProfitForm.get('profitMonth').setValue(this.currentMonth.monthName + '-' + this.currentMonth.year);
  }

}