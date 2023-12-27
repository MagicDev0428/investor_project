import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";
import { Observable, from, map } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Investment } from '../model/investment';
import { BaseComponent } from '../base/base.component';
import * as moment from 'moment';
import { InvestmentService } from '../service/investment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['../adam/investorForm.scss', './investment-form.component.scss'],
})

export class InvestmentFormComponent extends BaseComponent {

  amount = '';
  section = 'CREATE';
  title = 'New Investment'
  textAlign = '';
  profit = '';
  createdDate = '';
  createdBy = '';
  modifiedDate = '';
  modifiedBy = '';

  selectedInvestment$!: Observable<string | number>;
  investment: Investment = {
    _id: 0,
    startDate: new Date,
    endDate: new Date,
    investAmount: '',
    investType: '',
    profitMonthly: 0,
    profitYearly: 0,
    profitEnd: 0,
    explanation: '',
    attachments: [],
    createdDate: new Date,
    createdBy: '',
    modifiedDate: new Date,
    modifiedBy: '',
  }

  files: any[] = [];
  investmentId: any = '';
  values: any[] = [];
  investType: string = undefined;

  protected investmentForm: FormGroup;
  protected submitted = false;

  constructor(
    router: Router,
    auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private investmentService: InvestmentService,
    private toastrService: ToastrService,
  ) {
    super(router, auth);
    this.selectedInvestment$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestment$.subscribe(res => {
      this.investmentId = res;
    });
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(result => {
      this.user = result['investor-system'];
    });
    this.amount = String.fromCharCode(3647);
    this.textAlign = 'right';
    this.investmentForm = this.formBuilder.group(
      {
        _id: new FormControl(Validators.required),
        startDate: new FormControl(new Date()),
        endDate: new FormControl(new Date()),
        investAmount: new FormControl(""),
        investType: new FormControl("", Validators.required),
        profitMonthly: new FormControl(""),
        profitYearly: new FormControl(""),
        profitEnd: new FormControl(""),
        explanation: new FormControl(""),
        attachments: new FormControl()
      });

    this.investmentForm.addValidators([this.profitValidator]);

    if (typeof this.investmentId !== 'undefined') {
      this.investmentService.getInvestment(this.investmentId).subscribe({
        next: (res) => {
          this.values = res.investments;
          this.amount = this.values['investAmount'];
          this.changeStyle(this.amount);
          this.investmentForm.get('_id').setValue(this.values['_id']);
          this.investmentForm.get('startDate').setValue(moment(this.values['startDate']).format('yyyy-MM-DD'));
          this.investmentForm.get('endDate').setValue(moment(this.values['endDate']).format('yyyy-MM-DD'));
          this.investmentForm.get('investType').setValue(this.values['investType']);
          this.investType = this.values['investType'];
          this.investmentForm.get('profitMonthly').setValue(this.profit_style(this.values['profitMonthly']));
          this.investmentForm.get('profitYearly').setValue(this.profit_style(this.values['profitYearly']));
          this.investmentForm.get('profitEnd').setValue(this.profit_style(this.values['profitEnd']));
          this.investmentForm.get('explanation').setValue(this.values['explanation']);
          this.createdDate = moment(this.values['createdDate']).format('yyyy-MM-DD');
          this.investment.createdDate = this.values['createdDate'];
          this.createdBy = this.values['createdBy'];
          this.investment.createdBy = this.values['createdBy'];
          this.modifiedDate = moment(this.values['modifiedDate']).format('yyyy-MM-DD');
          this.investment.modifiedDate = this.values['modifiedDate'];
          this.modifiedBy = this.values['modifiedBy'];
          this.investment.modifiedBy = this.values['modifiedBy'];
          this.section = 'EDIT';
          this.title = this.investmentId + " " + this.values['investType'] + " " +
            this.investmentForm.get('investAmount').value + " at ";
          if ((this.values['investType'] === 'Monthly Profit') || (this.values['investType'] === 'Mixed')) {
            this.title += this.values['profitMonthly'] + '%';
          } else if (this.values['investType'] === 'Annual Profit') {
            this.title += this.values['profitYearly'] + '%';
          } else if (this.values['investType'] === 'One-time Profit') {
            this.title += this.values['profitEnd'] + '%';
          }
          this.title = this.title.replace(new RegExp(String.fromCharCode(3647), "gi"), "");
          this.checkProfitDisable();
        },
        error: err => {
          console.error('An error occurred :', err);
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    } else {
      this.investmentService.getInvestmentNo().subscribe((res) => {
        this.investmentForm.get('_id').setValue(res.investmentNo);
      });
    }
    this.checkProfitDisable();
  }

  profitValidator = (form: FormGroup) => {
    const investType = form.get('investType').value?.replace(/%/g, '');
    const profitMonthly = form.get('profitMonthly').value?.replace(/%/g, '');
    const profitYearly = form.get('profitYearly').value?.replace(/%/g, '');
    const profitEnd = form.get('profitEnd').value?.replace(/%/g, '');
    let valid = false;

    if (investType === 'Monthly Profit') {
      if (profitMonthly === '') {
        valid = false;
        return valid ? null : { monthlyRequired: "true" };
      }
      if (Number(profitMonthly?.replace(/%/g, '')) > 100 || Number(profitMonthly?.replace(/%/g, '')) < 0.01) {
        valid = false;
        return valid ? null : { monthlyExceed: "true" };
      }
    } if (investType === 'Annual Profit') {
      if (profitYearly === '') {
        valid = false;
        return valid ? null : { yearlyRequired: "true" };
      }
      if (Number(profitYearly?.replace(/%/g, '')) > 100 || Number(profitYearly?.replace(/%/g, '')) < 0.01) {
        valid = false;
        return valid ? null : { yearlyExceed: "true" };
      }
    } else if (investType === 'One-time Profit') {
      if (profitEnd === '') {
        valid = false;
        return valid ? null : { endRequired: "true" };
      }
      if (Number(profitEnd?.replace(/%/g, '')) > 100 || Number(profitEnd?.replace(/%/g, '')) < 0.01) {
        valid = false;
        return valid ? null : { endExceed: "true" };
      }
    } else if (investType === 'Mixed') {
      if (profitMonthly === '' && profitYearly === '' && profitEnd === '') {
        valid = false;
        return valid ? null : { anyoneRequired: "true" };
      }
      if (profitMonthly !== '') {

        if (Number(profitMonthly?.replace(/%/g, '')) > 100 || Number(profitMonthly?.replace(/%/g, '')) < 0.01) {
          valid = false;
          return valid ? null : { monthlyExceed: "true" };
        }
      }
      if (profitYearly !== '') {
        if (Number(profitYearly?.replace(/%/g, '')) > 100 || Number(profitYearly?.replace(/%/g, '')) < 0.01) {
          valid = false;
          return valid ? null : { yearlyExceed: "true" };
        }
      }
      if (profitEnd !== '') {
        if (Number(profitEnd?.replace(/%/g, '')) > 100 || Number(profitEnd?.replace(/%/g, '')) < 0.01) {
          valid = false;
          return valid ? null : { endExceed: "true" };
        }
      }
    }

    return null;
  };

  onSelectChange(event: any) {
    this.investType = event.target.value;
    this.checkProfitDisable();
  }

  checkProfitDisable() {
    if (this.investType === undefined) {
      this.investmentForm.get('profitMonthly').disable();
      this.investmentForm.get('profitYearly').disable();
      this.investmentForm.get('profitEnd').disable();
    } else if (this.investType === 'Monthly Profit') {
      this.investmentForm.get('profitMonthly').enable();
      this.investmentForm.get('profitYearly').disable();
      this.investmentForm.get('profitEnd').disable();
    } else if (this.investType === 'Annual Profit') {
      this.investmentForm.get('profitMonthly').disable();
      this.investmentForm.get('profitYearly').enable();
      this.investmentForm.get('profitEnd').disable();
    } else if (this.investType === 'One-time Profit') {
      this.investmentForm.get('profitMonthly').disable();
      this.investmentForm.get('profitYearly').disable();
      this.investmentForm.get('profitEnd').enable();
    } else if (this.investType === 'Mixed') {
      this.investmentForm.get('profitMonthly').enable();
      this.investmentForm.get('profitYearly').enable();
      this.investmentForm.get('profitEnd').enable();
    }
  }

  onInputChange(event: any) {
    let id = event.target.id;
    if (id === 'investAmount') {
      this.amount = event.target.value.replace(/\D/g, '');
      this.changeStyle(this.amount);
    } else if (id === 'profitMonthly' || id === 'profitYearly' || id === 'profitEnd') {
      this.profit = event.target.value?.replace(/%/g, '');
      this.investmentForm.get(id).setValue(this.profit + '%');
    }
  }

  changeStyle(value: any) {
    this.investmentForm.get('investAmount').setValue(this.currency_style(value));
  }
  
  deleteInvestment(_id: any) {
    if (typeof _id !== 'undefined') {
      this.investmentService.deleteInvestment(_id).subscribe({
        next: (res) => {
          this.toastrService.success('Investment was successfully deleted!');
          this.router.navigate(['/investment-list/']);
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
    if (this.investmentForm.valid) {
      this.investment._id = this.investmentForm.get('_id').value;
      this.investment.startDate = this.investmentForm.get('startDate').value;
      this.investment.endDate = this.investmentForm.get('endDate').value;
      this.investment.investAmount = this.amount?.toString().replace(/\D/g, '');
      this.investment.investType = this.investmentForm.get('investType').value;
      this.investment.profitMonthly = this.investmentForm.get('profitMonthly').value?.replace(/%/g, '');
      this.investment.profitYearly = this.investmentForm.get('profitYearly').value?.replace(/%/g, '');
      this.investment.profitEnd = this.investmentForm.get('profitEnd').value?.replace(/%/g, '');
      this.investment.explanation = this.investmentForm.get('explanation').value;

      if (typeof this.investmentId !== 'undefined') {
        this.investment.modifiedBy = this.user.name;
        this.investment.modifiedDate = new Date();
        this.investmentService.updateInvestment(this.investment).subscribe({
          next: (res) => {
            this.toastrService.success('Investment was successfully updated!');
            this.goTo('/investment-list/');
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        this.investment.createdBy = this.user.name;
        this.investment.createdDate = new Date();
        this.investmentService.createInvestment(this.investment).subscribe({
          next: (res) => {
            this.toastrService.success('Investment was successfully created!');
            this.goTo('/investment-list/');
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
 * Delete file from files list
 * @param index (File index)
 */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

}
