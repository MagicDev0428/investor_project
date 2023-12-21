import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { InvestmentService } from '../service/investment.service';
import { Adam } from '../model/adam';
import * as moment from 'moment';

@Component({
  selector: 'app-investment-info',
  templateUrl: './investment-info.component.html',
  styleUrls: ['../adam/investorForm.scss', './investment-info.component.scss'],
})

export class InvestmentInfoComponent extends BaseComponent {

  amount = '';
  textAlign = '';
  files: any[] = [];
  items = [];
  logs = [];
  title: string = '';
  investmentId: any = '';

  investmentInfo: any = [];
  adams: any = [];
  sumOfTotalAmountAdam: number = 0;

  myInvestments: any[];
  sumOfTotalAmountInvested: number = 0;
  investmentMissing: number = 0;

  logEtries: any = [];

  selectedInvestment$!: Observable<string | number>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.selectedInvestment$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestment$.subscribe(res => {
      this.investmentId = res;
    });
  }

  ngOnInit(): void {
    this.investmentService.getInvestmentInfo(this.investmentId).subscribe((res) => {
      this.investmentInfo = res.investmentInfo[0];
      this.adams = res.investmentInfo[0].investments?.adams?.adams.map(obj => {
        obj.amount = this.currency_style(obj.amount);
        obj.createdDate = moment(obj.createdDate).format('DD-MMM-YYYY');
        obj.modifiedDate = moment(obj.modifiedDate).format('DD-MMM-YYYY');
        return obj;
      });
      this.logEtries = res.investmentInfo[0].investments?.logs?.logs.map(obj => {
        obj.log = `${moment(obj._id).format('DD-MMM-YYYY')} ${obj.description} [${obj.investorName}]`;
        return obj;
      });
      this.sumOfTotalAmountAdam = this.currency_style(res.investmentInfo[0].investments?.adams?.
        sumOfTotalAmountAdam) ? this.currency_style(res.investmentInfo[0].investments?.adams?.
          sumOfTotalAmountAdam) : this.currency_style(0);
      this.myInvestments = res.investmentInfo[0].investments?.myInvestmentsList?.myInvestmentsList?.map(obj => {
        obj.amountInvested = this.currency_style(obj.amountInvested);
        obj.profitMonthlyPct = this.profit_style(obj.profitMonthlyPct);
        obj.transferDate = moment(obj.transferDate).format('DD-MMM-YYYY');
        obj.firstProfitDate = moment(obj.firstProfitDate).format('DD-MMM-YYYY');
        return obj;
      });
      this.sumOfTotalAmountInvested = this.currency_style(res.investmentInfo[0].investments?.myInvestmentsList?.sumOfTotalAmountInvested)
        ? this.currency_style(res.investmentInfo[0].investments?.myInvestmentsList?.sumOfTotalAmountInvested) :
        this.currency_style(0);
      this.investmentMissing = this.currency_style(res.investmentInfo[0].investments?.investmentMissing);
    });
  }

  protected onSubmit(): void {

  }

  goList() {
    this.router.navigate(['/investment-list/']);
  }

  goAdam() {
    this.router.navigate(['/adam-form/']);
  }

  goNewMyInvestment() {
    this.router.navigate(['/my-investment-form/']);
  }

  goLogForm() {
    this.router.navigate(['/log-form/']);
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
