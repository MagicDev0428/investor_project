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
  selector: 'app-adam-form',
  templateUrl: './adam-form.component.html',
  styleUrls: ['./investorForm.scss', './adam-form.component.scss'],
})

export class AdamFormComponent extends BaseComponent implements OnInit {
  @ViewChild('transactionFrom') transactionFrom: ElementRef;
  @ViewChild('transactionTo') transactionTo: ElementRef;

  amount = '';
  section = 'CREATE';
  title = 'ADAM\'\s New Transaction'
  selectedAdam$!: Observable<string | number>;
  adam: Adam = {
    _id: '',
    amount: '',
    transactionFrom: '',
    transactionTo: '',
    createdDate: new Date(),
    investments: '',
    investorName: '',
    investmentNo: 0,
    transferFrom: '',
    transferTo: '',
    transactionNo: '',
    description: '',
    attachments: [],
    createdBy: '',
    modifiedDate: new Date(),
    modifiedBy: '',
  }
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
  
  protected adamForm: FormGroup;
  protected submitted = false;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adamService: AdamService,
  ) {
    super(router, auth, toastrService);
    this.selectedAdam$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedAdam$.subscribe(res => {
      this.userId = res;
    });
    this.nowDateTime = new Date();
  }

  ngOnInit(): void {
    this.adamForm = this.formBuilder.group(
      {
        amount: new FormControl("", Validators.required),
        transactionFrom: new FormControl("", Validators.required),
        transactionTo: new FormControl("", Validators.required),
        createdDate: new FormControl("", Validators.required),
        investments: new FormControl(),
        investorName: new FormControl(),
        transferFrom: new FormControl(),
        transferTo: new FormControl(),
        transactionNo: new FormControl(),
        description: new FormControl(),
        attachments: new FormControl()
      });
      this.adamForm.get('createdDate').setValue(this.nowDateTime);
      this.adamService.getAdamInvestors().subscribe((res) => {
        this.investments = res.adams.investments;
        this.investorsNames = res.adams.investorsNames;
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
    if (typeof this.userId !== 'undefined') {
      this.adamService.getAdam(this.userId).subscribe({
        next: (res) => {
          this.values = res.adams;
          this.amount = this.values['amount'];
          this.changeStyle(this.amount);
          this.adamForm.get('transactionFrom').setValue(this.values['transactionFrom']);
          this.adamForm.get('transactionTo').setValue(this.values['transactionTo']);
          this.adamForm.get('createdDate').setValue(moment(this.values['createdDate']).format('yyyy-MM-DDTHH:mm'));
          this.adamForm.get('investments').setValue(this.values['investmentNo']);
          this.adamForm.get('investorName').setValue(this.values['investorName']);
          this.adamForm.get('transferFrom').setValue(this.values['transferFrom']);
          this.adamForm.get('transferTo').setValue(this.values['transferTo']);
          this.adamForm.get('transactionNo').setValue(this.values['transactionNo']);
          this.adamForm.get('description').setValue(this.values['description']);
          this.to_value = this.values['transactionTo'];
          this.from_value = this.values['transactionFrom'];
          this.createdDate = moment(this.values['createdDate']).format('yyyy-MM-DD');
          this.adam.createdDate = this.values['createdDate'];
          this.createdBy = this.values['createdBy'];
          this.adam.createdBy = this.values['createdBy'];
          this.modifiedDate = moment(this.values['modifiedDate']).format('yyyy-MM-DD');
          this.adam.modifiedDate = this.values['modifiedDate'];
          this.modifiedBy = this.values['modifiedBy'];
          this.section = 'EDIT';
          this.title = moment(this.values['createdDate']).format('DD-MMM-YYYY') + ' ' +
            'transfer ' + this.adamForm.get('amount').value;
          this.title = this.title.replace(new RegExp(String.fromCharCode(3647), "gi"), "");
          if (this.values['transactionTo']?.toLowerCase().includes('adam')) {
            this.title = this.title + ' to ' + 'Adam';
          } else if (this.values['transactionFrom']?.toLowerCase().includes('adam')) {
            this.title = this.title + ' from ' + 'Adam';
          }
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  changeStyle(value: any) {
    this.adamForm.get('amount').setValue(this.currency_style(value));
  }

  onInputChange(event: any) {
    this.amount = event.target.value.replace(/\D/g, '');
    this.changeStyle(this.amount);
  }

  deleteTransaction(_id: any) {
    if (typeof _id !== 'undefined') {
      this.adamService.deleteAdam(_id).subscribe({
        next: (res) => {
          this.toastrService.success('Data was successfully deleted!');
          this.router.navigate(['/adam-table/']);
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  checkSelect() {
    this.from_value = this.adamForm.get('transactionFrom').value;
    this.to_value = this.adamForm.get('transactionTo').value;
  }

  protected onSubmit(): void {
    this.submitted = true;
    if (this.adamForm.valid) {
      this.adam._id = this.userId;
      this.adam.amount = this.amount;
      this.adam.transactionFrom = this.adamForm.get('transactionFrom').value;
      this.adam.investmentNo = this.adamForm.get('investments').value;
      this.adam.transactionTo = this.adamForm.get('transactionTo').value;
      this.adam.createdDate = this.adamForm.get('createdDate').value;
      let selectedOption = document.querySelector(`option[value="${this.adam.investmentNo}"]`);
      this.adam.investments = selectedOption?.textContent.trim();
      this.adam.investorName = this.adamForm.get('investorName').value;
      this.adam.transferFrom = this.adamForm.get('transferFrom').value;
      this.adam.transferTo = this.adamForm.get('transferTo').value;
      this.adam.transactionNo = this.adamForm.get('transactionNo').value;
      this.adam.description = this.adamForm.get('description').value;

      if (this.adam.transactionFrom === this.adam.transactionTo) {
        this.toastrService.error('From and To can\'\t be same!');
        this.transactionFrom.nativeElement.focus();
        return;
      }
      if (typeof this.userId !== 'undefined') {
        this.adam.modifiedBy = this.user.name;
        this.adam.modifiedDate = new Date();
        this.adamService.updateAdam(this.adam).subscribe({
          next: (res) => {
            this.toastrService.success('Transaction was successfully updated!');
            this.router.navigate(['/adam-table/']);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        this.adam.createdBy = this.user.name;
        this.adam.createdDate = new Date();
        this.adamService.saveAdam(this.adam).subscribe({
          next: (res) => {
            this.toastrService.success('Transaction was successfully created!');
            this.router.navigate(['/adam-table/']);
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
    //this.adamForm.get('passportImage').setValue(this.files);

  }

  /**
  * Delete file from files list
  * @param index (File index)
  */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

}
