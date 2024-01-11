import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Log } from '../model/log';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
    Validators,
    FormGroup,
    FormControl,
} from "@angular/forms";

import { FormBuilder } from '@angular/forms';
import { AdamService } from '../service/adam.service';
import * as moment from 'moment';
import { AuthService } from '@auth0/auth0-angular';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['../adam/investorForm.scss', './log-in.component.scss']
})


export class LogInComponent extends BaseComponent implements OnInit {

    date: string = '';
    time: string = '';
    subscription: Subscription;

    protected logInForm: FormGroup;
    protected submitted = false;

    constructor(
        router: Router,
        auth: AuthService,
        toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
    ) {
        super(router, auth, toastrService);
        this.auth.user$.subscribe(result => {
            this.user = result['investor-system'];
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
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    protected onSubmit(): void {
        this.submitted = true;
        if (this.logInForm.valid) {

        }
    }
}
