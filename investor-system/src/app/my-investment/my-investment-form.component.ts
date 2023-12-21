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
  userId: any = '';
  values: any[] = [];
  investments: any[] = [];
  investorsNames: any[] = [];
  to_value: string;
  from_value: string;
  nowDateTime: Date;
  user: any = [];

  protected myInvestmentForm: FormGroup;
  protected submitted = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private auth: AuthService
  ) {
    super();
    this.nowDateTime = new Date();
  }

  ngOnInit(): void {
    this.myInvestmentForm = this.formBuilder.group(
      {
        investment: new FormControl(),
        investorName: new FormControl(),
        amount: new FormControl(),
        transferFrom: new FormControl(),
        transferTo: new FormControl(),
        transferDate: new FormControl(),
        transactionNo: new FormControl(),
        attachments: new FormControl(),
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
      this.auth.user$.subscribe(result => {
        this.user = result;
        this.title += ' ' + this.user.name;
      });
  }

  changeStyle(value: any) {
    this.myInvestmentForm.get('amount').setValue(this.currency_style(value));
  }

  onInputChange(event: any) {
    this.amount = event.target.value.replace(/\D/g, '');
    this.changeStyle(this.amount);
  }

  deleteTransaction(_id: any) {
    
  }

  protected onSubmit(): void {
    this.submitted = true;
    
  }

  goTable() {
    
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
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 0) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
  * Delete file from files list
  * @param index (File index)
  */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

}
