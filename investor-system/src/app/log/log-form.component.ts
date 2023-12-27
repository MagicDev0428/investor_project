import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Log } from '../model/log';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";

import { FormBuilder } from '@angular/forms';
import { LogService } from '../service/log.service';
import { AdamService } from '../service/adam.service';
import * as moment from 'moment';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['../adam/investorForm.scss', './log-form.component.scss']
})


export class LogFormComponent extends BaseComponent {

  logId: any = '';
  selectedLog$!: Observable<string | number>;
  investments: any = [];
  customers: any = [];
  date: string = '';
  time: string = '';
  logBy: string = '';
  values: any = [];

  protected logForm: FormGroup;
  protected submitted = false;
  log: Log = {
    _id: new Date(),
    logBy: '',
    logType: '',
    investorName: '',
    investmentNo: 0,
    description: ''
  }

  constructor(
    router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adamService: AdamService,
    private logService: LogService,
    private toastrService: ToastrService,
    auth: AuthService
  ) {
    super(router, auth);
    this.selectedLog$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedLog$.subscribe(res => {
      this.logId = res;
    });
    this.auth.user$.subscribe(result => {
      this.user = result['investor-system'];
    });
  }

  ngOnInit(): void {
    this.date = moment().format('DD MMM YYYY');
    this.time = moment().format('HH:mm');
    this.logBy = this.user.name;
    this.logForm = this.formBuilder.group(
      {
        logType: new FormControl("", Validators.required),
        investorName: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        investment: new FormControl("", Validators.required)
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
    if (typeof this.logId !== 'undefined') {
      this.logService.getLog(this.logId).subscribe({
        next: (res) => {
          this.values = res.logs;
          this.logForm.get('logType').setValue(this.values['logType']);
          this.logForm.get('investorName').setValue(this.values['investorName']);
          this.logForm.get('investment').setValue(this.values['investmentNo']);
          this.logForm.get('description').setValue(this.values['description']);
          this.date = moment(this.values['_id']).format('DD MMM YYYY');
          this.time = moment(this.values['_id']).format('HH:mm');
          this.logBy = this.values['logBy'];
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  deleteTransaction(_id: any) {
    if (typeof _id !== 'undefined') {
      this.logService.deleteLog(_id).subscribe({
        next: (res) => {
          this.toastrService.success('Log was successfully deleted!');
          this.router.navigate(['/log-list/']);
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
    if (this.logForm.valid) {
      this.log._id = new Date();
      this.log.logBy = this.logBy;
      this.log.logType = this.logForm.get('logType').value;
      this.log.investorName = this.logForm.get('investorName').value;
      this.log.investmentNo = this.logForm.get('investment').value;
      this.log.description = this.logForm.get('description').value;

      if (typeof this.logId !== 'undefined') {
        this.log._id = this.values['_id'];
        this.logService.updateLog(this.log).subscribe({
          next: (res) => {
            this.toastrService.success('Log was successfully updated!');
            this.router.navigate(['/log-list/']);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      } else {
        this.logService.saveLog(this.log).subscribe({
          next: (res) => {
            this.toastrService.success('Log was successfully created!');
            this.router.navigate(['/log-list/']);
          },
          error: err => {
            this.toastrService.error(err);
          },
          complete: () => console.log('There are no more action happen.')
        });
      }
    }
  }
}
