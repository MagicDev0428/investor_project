import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';

const temp = [
    "25-Jul-2023 created the Investment [Torben]",
    "26-Jul-2023 updated the Investment [Bee]",
    "28-Jul-2023 added new Investment 4,500,000 from Mark [Torben]",
    "28-Aug-2023 added new Investment 3,000,000 from Mark [Torben]",
    "15-Sep-2023 paid profit 90,000 to Mark [Bee]",
    "15-Sep-2023 sent Email to Mark [Bee]",
    "15-Sep-2023 paid profit 60,000 to Mark [Bee]",
    "15-Sep-2023 Mark withdraw 50,000 [Bee]",
    "15-Oct-2023 paid profit 90,000 to Mark [Bee]",
];



@Component({
    selector: 'app-balance-log',
    templateUrl: './balance-log.component.html',
    styleUrls: ['../adam/investorForm.scss', './balance-log.component.scss'],
})

export class BalanceLogComponent extends BaseComponent implements OnInit {
    @Output() isShown = new EventEmitter<boolean>();

    userId: any = '';
    values: any[] = [];
    createdDate = '';
    createdBy = '';
    modifiedDate = '';
    modifiedBy = '';
    log_entry = [];


    protected submitted = false;

    constructor(
        router: Router,
        auth: AuthService,
        toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
    ) {
        super(router, auth, toastrService);
    }

    ngOnInit(): void {
        this.log_entry = temp;
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
