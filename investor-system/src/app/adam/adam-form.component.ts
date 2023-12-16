import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Adam } from '../model/adam';
import { Observable, map } from 'rxjs';
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

@Component({
  selector: 'app-adam-form',
  templateUrl: './adam-form.component.html',
  styleUrls: ['./investorForm.scss', './adam-form.component.scss'],
})

export class AdamFormComponent implements OnInit {
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
    attachments: []
  }
  files: any[] = [];
  userId: any = '';
  values: any[] = [];
  investments: any[] = [];
  investorsNames: any[] = [];

  protected adamForm: FormGroup;
  protected submitted = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private adamService: AdamService, private toastrService: ToastrService) {
    this.selectedAdam$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedAdam$.subscribe(res => {
      this.userId = res;
    });
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
    if (typeof this.userId !== 'undefined') {
      this.adamService.getAdam(this.userId).subscribe({
        next: (res) => {
          this.values = res.adams;
          this.amount = this.values['amount'];
          this.currency_style(this.amount);
          this.adamForm.get('transactionFrom').setValue(this.values['transactionFrom']);
          this.adamForm.get('transactionTo').setValue(this.values['transactionTo']);
          this.adamForm.get('createdDate').setValue(moment(this.values['createdDate']).format('yyyy-MM-DD'));
          this.adamForm.get('investments').setValue(this.values['investmentNo']);
          this.adamForm.get('investorName').setValue(this.values['investorName']);
          this.adamForm.get('transferFrom').setValue(this.values['transferFrom']);
          this.adamForm.get('transferTo').setValue(this.values['transferTo']);
          this.adamForm.get('transactionNo').setValue(this.values['transactionNo']);
          this.adamForm.get('description').setValue(this.values['description']);
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
          console.error('An error occurred :', err);
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
    this.adamService.getAdamInvestors().subscribe((res) => {
      this.investments = res.adams.investments;
      this.investorsNames = res.adams.investorsNames;
      this.investments = res.adams.investments.map(obj => {
        if(obj._id === undefined ) {
          obj._id = ""
        } 
        if(obj.Explanation === undefined ) {
          obj.Explanation = ""
        } 
        return obj;
      });
    });
  }

  onlyNumbers(event: KeyboardEvent) {
    if (
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Tab" &&
      (event.key < "0" || event.key > "9")
    ) {
      event.preventDefault();
    }
  }

  currency_style(value: any) {
    let thb_character = String.fromCharCode(3647);
    value = value?.toString();
    value = value?.replace(/,/g, ''); // Remove existing commas
    value = value?.replace(thb_character, ''); //Remove existing thb mark
    value = value?.replace(' ', ''); //Remove existing spaces
    value = value?.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three numbers
    value = value?.replace(value, thb_character + ' ' + value);
    this.adamForm.get('amount').setValue(value);
  }

  onInputChange(event: any) {
    this.amount = event.target.value.replace(/\D/g, '');
    this.currency_style(this.amount);
  }

  deleteTransaction(_id: any) {
    console.log('ID->', _id);
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
        this.adamService.updateAdam(this.adam).subscribe({
          next: (res) => {
            this.toastrService.success('Transaction was successfully created!');
            this.router.navigate(['/adam-form/' + this.userId]);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
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

  checkSelect(name: string) {
    let from_val = this.adamForm.get('transactionFrom').value;
    let to_val = this.adamForm.get('transactionTo').value
    if (name === 'from') {
      if (from_val === to_val) {
        this.toastrService.error('From and To can\'\t be same!');
        this.transactionFrom.nativeElement.focus();
        this.adamForm.get('transactionFrom').setValue("");
      }
    } else if (name === 'to') {
      if (from_val === to_val) {
        this.toastrService.error('From and To can\'\t be same!');
        this.transactionTo.nativeElement.focus();
        this.adamForm.get('transactionTo').setValue("");
      }
    }
  }

  goTable() {
    this.router.navigate(['/adam-table/']);
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
