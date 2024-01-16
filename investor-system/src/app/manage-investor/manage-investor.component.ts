import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Investor } from '../model/investor';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import * as moment from 'moment'

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


export class ManageInvestorComponent extends BaseComponent implements OnInit {

  selectedInvestor$!: Observable<string | number>;
  investor: any = {
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
    investorFolderId: '',
    LastLoginDate: null,
    loginAttempts: 0
  }
  files: any[] = [];
  userId;
  values: any = [];
  _oldId = '';

  protected addInvestorForm: FormGroup;
  protected submitted = false;
  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private investorService: InvestorService,
  ) {
    super(router, auth, toastrService);
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
    })

  }

  ngOnInit() {

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
        status: new FormControl("ACTIVE"),
        facebook: new FormControl(),
        passport: new FormControl(),
        beneficiaryName: new FormControl(""),
        beneficiaryEmail: new FormControl(""),
        beneficiaryPhone: new FormControl(""),
        countryToTransfer: new FormControl(),
        currency: new FormControl(),
        reason: new FormControl(),
        passportImages: new FormControl(),
        pincode: new FormControl(this.generatePinCode(), Validators.required),
        transferType: new FormControl(""),
        transferInfo: new FormControl(""),
        LastLoginDate: new FormControl(""),
        loginAttempts: new FormControl(0)
      });

    this.addInvestorForm.setValidators([this.emailValidator, this.beneficiaryEmailValidator]);

    if (typeof this.userId !== 'undefined') {
      this.investorService.getInvestor(this.userId).subscribe({
        next: (res) => {
          this.values = res.investors;
          this._oldId = this.values._id;
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
          this.addInvestorForm.get('transferInfo').setValue(this.values['transferInfo']);
          let lastLogin = this.values['LastLoginDate'];
          this.addInvestorForm.get('LastLoginDate').setValue(lastLogin ? moment(lastLogin).format('DD-MMM-YYYY HH:mm') : "");
          this.addInvestorForm.get('loginAttempts').setValue(this.values['loginAttempts'] ?? 0);
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

  changeTransferType(event: any) {
    let transferType = event.target.value;
    if (transferType === 'Envelope') {
      this.addInvestorForm.get('transferInfo').setValue('Envelope in Safe');
    } else {
      this.addInvestorForm.get('transferInfo').setValue('');
    }
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
      this.investor.transferInfo = this.addInvestorForm.get('transferInfo').value;

      let formData;
      if (this.files && this.files.length) {
        formData = this.investorService.uploadFile(this.files);
      } else {
        formData = new FormData()
      }

      const formValues = this.addInvestorForm.value;
      for (const key in formValues) {
        if (formValues.hasOwnProperty(key) && formValues[key]) {
          formData.append(key, formValues[key]);
        }
      }

      this.files.forEach(file => {
        formData.append("passportImage", file.name)
      });
      formData.set("_id", this.addInvestorForm.get('name').value);
      console.log('formData', formData);

      let investorName = this.addInvestorForm.get('name').value;
      if (typeof this.userId !== 'undefined') {
        // Update case

        formData.append("folders", JSON.stringify(this.values.folders));
        formData.append("_oldId", this._oldId);
        this.investorService.updateInvestor(formData).subscribe({
          next: (res) => {
            this.toastrService.success(`Investor ${investorName} successfully updated!`);
            this.router.navigate(['/list/']);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        // Save case
        this.investorService.saveInvestor(formData).subscribe({
          next: (res) => {
            this.toastrService.success(`Investor ${investorName} was successfully created!`);
            this.router.navigate(['/list/']);
          },
          complete: () => console.log('There are no more action happen.')
        });
      }
    }
  }

  resetAttempt() {
    this.investorService.resetAttempt(this.userId).subscribe({
      next: (res) => {
        this.toastrService.success(`Login Attempt was successfully reset!`);
        this.addInvestorForm.get('loginAttempts').setValue(0);
      },
      complete: () => console.log('There are no more action happen.')
    });
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
  * Delete file from files list
  * @param index (File index)
  */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  deleteInvestorFile(item) {
    item.image = null;
    item.webLink = null;
    console.log(this.values.folders);
  }
}
