import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Investor } from '../model/investor';
import { Observable, map } from 'rxjs';
import {
  Validators,
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

  protected addInvestorForm: FormGroup;
  protected submitted = false;
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private investorService: InvestorService) {

    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      console.log(res);
      this.investorService.getMockdata().subscribe({
        next:(val) => {
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
      investorName: new FormControl("", Validators.required),
      nickName: new FormControl(),
      phone: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl(),
      zipCode: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      investorStatus: new FormControl(),
      facebook: new FormControl(),
      passport: new FormControl(),
      beneficiaryName: new FormControl("", Validators.required),
      beneficiaryEmail: new FormControl("", [Validators.required, Validators.email]),
      beneficiaryPhone: new FormControl("", Validators.required),
      countryToTransfer: new FormControl(),
      currency: new FormControl(),
      reason: new FormControl(),
      
    });

    
    this.addInvestorForm.setValue({investorName: this.investor.investorName, nickName: '', phone: 12356, email: "",
      address: "", zipCode: "", city: "", country: "", investorStatus: "", facebook: "", passport: "", beneficiaryName: ""
,     });

   }
  

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
    }
  }
}
