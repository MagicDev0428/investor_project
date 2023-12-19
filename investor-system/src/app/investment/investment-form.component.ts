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

  protected investmentForm: FormGroup;
  protected submitted = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private investmentService: InvestmentService,
    private toastrService: ToastrService
  ) {
    super();
    this.selectedInvestment$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestment$.subscribe(res => {
      this.investmentId = res;
    });
  }

  ngOnInit(): void {
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
          this.investmentForm.get('profitMonthly').setValue(this.profit_style(this.values['profitMonthly']));
          this.investmentForm.get('profitYearly').setValue(this.profit_style(this.values['profitYearly']));
          this.investmentForm.get('profitEnd').setValue(this.profit_style(this.values['profitEnd']));
          this.investmentForm.get('explanation').setValue(this.values['explanation']);
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
  }

  profitValidator = (form: FormGroup) => {
    const investType = form.get('investType').value;
    const profitMonthly = form.get('profitMonthly').value;
    const profitYearly = form.get('profitYearly').value;
    const profitEnd = form.get('profitEnd').value;
    let valid = false;
    if (investType === 'Monthly Profit') {
      // if (profitMonthly === undefined)
      valid = profitMonthly === '' ? false : true;
      console.log('val->', valid);
      return valid ? null : { monthlyRequired: "true" };
    } else if (investType === 'Annual Profit') {
      valid = profitYearly === '' ? false : true;
      return valid ? null : { yearlyRequired: "true" };
    } else if (investType === 'One-time Profit') {
      valid = profitEnd === '' ? false : true;
      return valid ? null : { endRequired: "true" };
    } else if (investType === 'Mixed') {
      if (profitMonthly === '' && profitYearly === '' && profitEnd === '') {
        valid = false;
        return valid ? null : { anyoneRequired: "true" };
      }
    }
    return null;
  };

  onInputChange(event: any) {
    this.amount = event.target.value.replace(/\D/g, '');
    this.changeStyle(this.amount);
  }

  changeStyle(value: any) {
    this.investmentForm.get('investAmount').setValue(this.currency_style(value));
  }

  goList() {
    this.router.navigate(['/investment-list/']);
  }

  deleteInvestment(_id: any) {
    if (typeof _id !== 'undefined') {
      this.investmentService.deleteInvestment(_id).subscribe({
        next: (res) => {
          this.toastrService.success('Data was successfully deleted!');
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
        this.investmentService.updateInvestment(this.investment).subscribe({
          next: (res) => {
            this.toastrService.success('Investment was successfully updated!');
            this.goList();
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        this.investmentService.createInvestment(this.investment).subscribe({
          next: (res) => {
            this.toastrService.success('Investment was successfully created!');
            this.goList();
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
