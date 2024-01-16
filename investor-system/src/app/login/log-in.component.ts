import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
    Validators,
    FormGroup,
    FormControl,
} from "@angular/forms";

import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '@auth0/auth0-angular';
import { interval, Subscription } from 'rxjs';
import { InvestorService } from '../service/investor.service';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['../adam/investorForm.scss', './log-in.component.scss']
})


export class LogInComponent extends BaseComponent implements OnInit {

    date: string = '';
    time: string = '';
    subscription: Subscription;
    error: any;
    login: any = {
        email: '',
        pincode: ''
    }

    protected logInForm: FormGroup;
    protected submitted = false;

    constructor(
        router: Router,
        auth: AuthService,
        toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private investorService: InvestorService
    ) {
        super(router, auth, toastrService);
        this.activatedRoute.queryParams.subscribe(params => {
            this.login.email = params['m'];
            // Use the email parameter for further processing
        });
    }

    ngOnInit(): void {
        this.logInForm = this.formBuilder.group(
            {
                pincode: new FormControl("", Validators.required),
            });
        this.subscription = interval(1000).subscribe(() => {
            this.date = moment(new Date()).format('DD MMM YYYY');
            this.time = moment(new Date()).format('HH:mm:ss');
        });
        console.log('email', this.login.email);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    protected onSubmit(): void {
        this.submitted = true;
        if (this.logInForm.valid) {
            this.login.pincode = this.logInForm.get('pincode').value;
            this.investorService.loginWithPincode(this.login).subscribe({
                next: (res) => {
                  if(res?.error) {
                    this.error = res?.error;
                  } else {
                    
                  }
                },
                error: err => {
                  this.toastrService.error(err);
                },
                complete: () => console.log('There are no more action happen.')
              });
        }
    }
}
