import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap , Router} from '@angular/router';
import { Investor } from '../model/investor';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import {
  AbstractControl,
  Validators,
  ValidatorFn,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";

import { FormBuilder } from '@angular/forms';
import { InvestorService } from '../service/investor.service';

@Component({
  selector: 'app-manage-investor',
  templateUrl: './manage-investor.component.html',
  styleUrls: ['./manage-investor.component.scss']
})


export class ManageInvestorComponent implements OnInit {

  selectedInvestor$!: Observable<string | number>;
  investor: Investor = {
    _id: undefined,
    name: '',
    nickname: '',
    phone: '',
    email: '',
    address: '',
    postcode: 0,
    city: '',
    country: '',
    status: '',
    facebook: '',
    passport: '',
    beneficiaryName: '',
    beneficiaryEmail: '',
    beneficiaryPhone: '',
    countryToTransfer: '',
    currency: '',
    reason: '',
    passportImages: undefined,
    pincode: 0,
    isAdmin: false,
    transferType: '',
    transferInfo: '',
  }
  files: any[] = [];
  userId;
  values: any = [];

  protected addInvestorForm: FormGroup;
  protected submitted = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private investorService: InvestorService,
    private toastrService: ToastrService
  ) {
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
    })

  }

  ngOnInit() {
    //   this.activatedRoute.paramMap.subscribe((params: ParamMap) =>  {
    //     this.selectedInvestor$ = params.get('id');
    // });

    this.addInvestorForm = this.formBuilder.group(
      {
        _id: new FormControl(""),
        name: new FormControl("", Validators.required),
        nickname: new FormControl("", Validators.required),
        phone: new FormControl(""),
        email: new FormControl(""),
        address: new FormControl(),
        postcode: new FormControl(),
        city: new FormControl(),
        country: new FormControl(),
        status: new FormControl("active"),
        facebook: new FormControl(),
        passport: new FormControl(),
        beneficiaryName: new FormControl(""),
        beneficiaryEmail: new FormControl(""),
        beneficiaryPhone: new FormControl(""),
        countryToTransfer: new FormControl(),
        currency: new FormControl(),
        reason: new FormControl(),
        passportImages: new FormControl(),
        pincode: new FormControl("", Validators.required),
        transferType: new FormControl()
      });

    this.addInvestorForm.setValidators([this.emailValidator, this.beneficiaryEmailValidator]);

    if (typeof this.userId !== 'undefined') {
      this.investorService.getInvestor(this.userId).subscribe({
        next: (res) => {
          this.values = res.investors;
          this.addInvestorForm.get('_id').setValue(this.values['name']);
          this.addInvestorForm.get('nickname').setValue(this.values['nickname']);
          this.addInvestorForm.get('name').setValue(this.values['_id']);
          this.addInvestorForm.get('phone').setValue(this.values['phone']);
          this.addInvestorForm.get('email').setValue(this.values['email']);
          this.addInvestorForm.get('address').setValue(this.values['address']);
          this.addInvestorForm.get('postcode').setValue(this.values['postcode']);
          this.addInvestorForm.get('city').setValue(this.values['city']);
          this.addInvestorForm.get('country').setValue(this.values['country']);
          this.addInvestorForm.get('status').setValue(this.values['status']);
          this.addInvestorForm.get('facebook').setValue(this.values['facebook']);
          this.addInvestorForm.get('passport').setValue(this.values['passport']);
          this.addInvestorForm.get('beneficiaryName').setValue(this.values['beneficiaryName']);
          this.addInvestorForm.get('beneficiaryEmail').setValue(this.values['beneficiaryEmail']);
          this.addInvestorForm.get('beneficiaryPhone').setValue(this.values['beneficiaryPhone']);
          this.addInvestorForm.get('countryToTransfer').setValue(this.values['countryToTransfer']);
          this.addInvestorForm.get('currency').setValue(this.values['currency']);
          this.addInvestorForm.get('reason').setValue(this.values['reason']);
          this.addInvestorForm.get('pincode').setValue(this.values['pincode']);
          this.addInvestorForm.get('transferType').setValue(this.values['transferType']);
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  emailValidator = (form: FormGroup) => {
    const email = form.get('email').value;
    const emailRegex = /^$|^.+@[^\.].*\.[a-z]{2,}$/; // Customize the regex pattern as needed

    const valid = emailRegex.test(email);
    return valid ? null : { invalidEmail: "true" };
  };

  beneficiaryEmailValidator = (form: FormGroup) => {
    const beneficiaryEmail = form.get('beneficiaryEmail').value;
    const emailRegex = /^$|^.+@[^\.].*\.[a-z]{2,}$/; // Customize the regex pattern as needed

    const valid = emailRegex.test(beneficiaryEmail);
    return valid ? null : { invalidBeneficiaryEmail: "true" };
  };

  protected get InvestorFormControl() {
    return this.addInvestorForm.controls;
  }

  deleteInvestor(_id: any) {
    if (typeof _id !== 'undefined') {
      this.investorService.deleteInvestor(_id).subscribe({
        next: (res) => {
          this.toastrService.success('Investor was successfully deleted!');
          this.router.navigate(['/list/']);
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  goList() {
    this.router.navigate(['/list/']);
  }

  protected onSubmit(): void {
    this.submitted = true;
    if (this.addInvestorForm.valid) {
      this.investor.name = this.addInvestorForm.get('name').value;
      this.investor.nickname = this.addInvestorForm.get('nickname').value;
      this.investor.phone = this.addInvestorForm.get('phone').value;
      this.investor.email = this.addInvestorForm.get('email').value;
      this.investor.address = this.addInvestorForm.get('address').value;
      this.investor.postcode = this.addInvestorForm.get('postcode').value;
      this.investor.city = this.addInvestorForm.get('city').value;
      this.investor.country = this.addInvestorForm.get('country').value;
      this.investor.status = this.addInvestorForm.get('status').value;
      this.investor.facebook = this.addInvestorForm.get('facebook').value;
      this.investor.passport = this.addInvestorForm.get('passport').value;
      this.investor.beneficiaryName = this.addInvestorForm.get('beneficiaryName').value;
      this.investor.beneficiaryEmail = this.addInvestorForm.get('beneficiaryEmail').value;
      this.investor.beneficiaryPhone = this.addInvestorForm.get('beneficiaryPhone').value;
      this.investor.countryToTransfer = this.addInvestorForm.get('countryToTransfer').value;
      this.investor.currency = this.addInvestorForm.get('currency').value;
      this.investor.reason = this.addInvestorForm.get('reason').value;
      this.investor.pincode = this.addInvestorForm.get('pincode').value;
      this.investor.transferType = this.addInvestorForm.get('transferType').value;

      if (typeof this.userId !== 'undefined') {
        this.investor._id = this.userId;
        this.investorService.updateInvestor(this.investor).subscribe({
          next: (res) => {
            this.toastrService.success('Investor was successfully updated!');
            this.router.navigate(['/list/']);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        this.investor._id = this.addInvestorForm.get('name').value;
        this.investorService.saveInvestor(this.investor).subscribe({
          next: (res) => {
            this.toastrService.success('Investor was successfully created!');
            this.router.navigate(['/list/']);
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
    //this.addInvestorForm.get('passportImage').setValue(this.files);

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
