import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  investor: Investor;
  files: any[] = [];
  userId;

  protected addInvestorForm: FormGroup;
  protected submitted = false;
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private investorService: InvestorService, private toastrService: ToastrService) {

    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
      this.investorService.getMockdata().subscribe({
        next: (val) => {
          console.log(val);
          this.investor = val;

        }
      })
    })

  }

  ngOnInit() {    
    //   this.activatedRoute.paramMap.subscribe((params: ParamMap) =>  {
    //     this.selectedInvestor$ = params.get('id');
    // });

    this.addInvestorForm = this.formBuilder.group(
      {
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
        pincode: new FormControl("", Validators.required)
      });

    this.addInvestorForm.setValidators([this.emailValidator, this.beneficiaryEmailValidator])

    //     this.addInvestorForm.setValue({name: this.investor.name, nickname: '', phone: 12356, email: "",
    //       address: "", zipCode: "", city: "", country: "", status: "", facebook: "", passport: "", beneficiaryName: ""
    // ,     });

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

  protected onSubmit(): void {
    this.submitted = true;

    if (this.addInvestorForm.valid) {
      console.log(
        "Form Submitted succesfully!!!\n Check the values in browser console."
      );
      console.table(this.addInvestorForm.value);

      let formData;
      if (this.files && this.files.length) {
        formData = this.investorService.uploadFile(this.files);
      } else {
        formData = new FormData()
      }

      const formValues = this.addInvestorForm.value;
      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          formData.append(key, formValues[key]);
        }
      }
      // const mData = JSON.stringify(this.addInvestorForm.value);

      // formData.append('data', mData);
      console.log('formData', formData);

      this.investorService.saveInvestor(formData).subscribe({
        next: (x) => {
          console.log('The next value is: ', x)
          this.toastrService.success('Investor Created Successfully!');
        },
        error: err => {
          console.error('An error occurred :', err);
          this.toastrService.error('Error while saving investor');
        },
        complete: () => console.log('There are no more action happen.')
      })

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
