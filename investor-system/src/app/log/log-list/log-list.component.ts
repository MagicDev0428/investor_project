import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LogService } from '../../service/log.service';
import { AdamService } from '../../service/adam.service';
import * as moment from 'moment';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['../../adam/investorForm.scss', './log-list.component.scss']
})
export class LogListComponent extends BaseComponent {

  items: any = [];
  temp: any = [];
  investments: any = [];
  customers: any = [];
  currentColumn: string = '';
  isDescending: boolean = false;

  protected logSearchForm: FormGroup;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private logService: LogService,
    private formBuilder: FormBuilder,
    private adamService: AdamService
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit(): void {
    this.logSearchForm = this.formBuilder.group(
      {
        fromDate: new FormControl(moment().subtract(1, 'months').format('DD-MM-YYYY'), Validators.required),
        toDate: new FormControl(moment(new Date()).format('DD-MM-YYYY'), Validators.required),
        logType: new FormControl("", Validators.required),
        investorName: new FormControl("", Validators.required),
        investment: new FormControl("", Validators.required)
      });
    this.logService.logList().subscribe((res) => {
      this.items = res.logs.map((log) => {
        log.date = moment(log._id).format('DD MMM YYYY');
        log.time = moment(log._id).format('HH:mm');
        return log;
      });
      this.items.sort((a, b) => {
        if (a['_id'] > b['_id']) {
          return -1;
        } else if (a['_id'] < b['_id']) {
          return 1;
        } else {
          return 0;
        }
      });
      this.temp = this.items;
    });
    this.adamService.getAdamInvestors().subscribe((res) => {
      this.customers = res.adams.investorsNames;
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
    this.onSearch();
  }

  orderTable(column: string) {
    if (this.currentColumn === column) {
      this.isDescending = !this.isDescending;
    } else {
      this.currentColumn = column;
      this.isDescending = false;
    }

    this.items.sort((a, b) => {
      if (a[column] > b[column]) {
        return this.isDescending ? -1 : 1;
      } else if (a[column] < b[column]) {
        return this.isDescending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  onSearch() {
    let fromDate = this.logSearchForm.get('fromDate').value;
    let toDate = this.logSearchForm.get('toDate').value;
    let logType = this.logSearchForm.get('logType').value;
    let investorName = this.logSearchForm.get('investorName').value;
    let investment = this.logSearchForm.get('investment').value;
    this.items = this.temp;
    if (logType !== '') {
      this.items = this.items.filter(item => item.logType?.toLowerCase().includes(logType.toLowerCase()));
    }
    if (investorName !== '') {
      this.items = this.items.filter(item => item.investorName?.toLowerCase().includes(investorName.toLowerCase()));
    }
    if (investment !== '') {
      this.items = this.items.filter(item => item.investmentNo?.toString().toLowerCase() === (investment.toLowerCase()));
    }
    if (fromDate !== '') {
      this.items = this.items.filter(item => new Date(item._id) >= new Date(fromDate));
    }
    if (toDate !== '') {
      this.items = this.items.filter(item => new Date(item._id) <= new Date(toDate));
    }
  }

  onReset() {
    this.logSearchForm.get('fromDate').setValue(moment().subtract(1, 'months').format('DD-MM-YYYY'));
    this.logSearchForm.get('toDate').setValue(moment(new Date()).format('DD-MM-YYYY'));
    this.logSearchForm.get('logType').setValue("");
    this.logSearchForm.get('investorName').setValue("");
    this.logSearchForm.get('investment').setValue("");
    this.items = this.temp;
  }

  goForm(id: string = '') {
    if (id.length === 0) {
      this.router.navigate(['/log-form']);
    } else {
      this.router.navigate(['/log-form/' + id]);
    }
  }
}
