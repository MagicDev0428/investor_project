import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { LogService } from '../service/log.service';

@Component({
    selector: 'app-balance-log',
    templateUrl: './balance-log.component.html',
    styleUrls: ['../adam/investorForm.scss', './balance-log.component.scss'],
})

export class BalanceLogComponent extends BaseComponent implements OnInit {
    @Output() isShown = new EventEmitter<boolean>();
    @Input() params: any = {};

    userId: any = '';
    values: any[] = [];
    createdDate = '';
    createdBy = '';
    modifiedDate = '';
    modifiedBy = '';
    log_entry: any = [];


    protected submitted = false;

    constructor(
        router: Router,
        auth: AuthService,
        toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        private logService: LogService,
    ) {
        super(router, auth, toastrService);
    }

    ngOnInit(): void {
        this.userId = this.params?.params?.userId;
        if (this.userId !== undefined) {
            this.logService.getInvestorLogs(this.userId).subscribe((res) => {
                this.log_entry = res.logs.map((log) => {
                    log.date = moment(log._id).format('DD-MMM-YYYY');
                    log.time = moment(log._id).format('HH:mm');
                    return log;
                });
            });
        }
    }

    deleteTransaction(_id: any) {

    }

    checkSelect() {

    }

    onClose() {
        this.isShown.emit(true);
    }

    protected onSubmit(): void {
        this.submitted = true;

    }
}
