import { Component } from '@angular/core';
import { AdamService } from '../service/adam.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-adam-table',
    templateUrl: './adam-table.component.html',
    styleUrls: ['investorForm.scss', './adam-table.component.scss'],
})

export class AdamTableComponent extends BaseComponent {

    items: any[] = [];
    temp: any[] = [];
    searchTerm: string = '';
    currentColumn: string = '';
    isDescending: boolean = false;

    constructor(
        router: Router,
        auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private adamService: AdamService
    ) {
        super(router, auth);
    }

    ngOnInit(): void {
        this.adamService.listAdam().subscribe((res) => {
            this.items = res.adams.map((adam) => {
                adam.createdDate = moment(adam.createdDate).format('DD-MMM-YYYY');
                adam.amount = this.currency_style(adam.amount);
                return adam;
            });
            this.temp = this.items;
        });
    }

    onSearch(event: KeyboardEvent) {
        this.items = this.temp;
        this.items = this.items.filter(item => item.description?.toLowerCase().includes(this.searchTerm.toLowerCase()));
        if (this.searchTerm === "") {
            this.items = this.temp;
        }
    }

    goForm(id: string = '') {
        if (id.length === 0) {
            this.router.navigate(['/adam-form']);
        } else {
            this.router.navigate(['/adam-form/' + id]);
        }
    }

    goFront() {
        this.router.navigate(['/front-page/']);
    }

    orderTable(column: string) {
        if (this.currentColumn === column) {
            this.isDescending = !this.isDescending;
        } else {
            this.currentColumn = column;
            this.isDescending = false;
        }

        this.items.sort((a, b) => {
            if (column !== 'amount') {
                if (a[column] > b[column]) {
                    return this.isDescending ? -1 : 1;
                } else if (a[column] < b[column]) {
                    return this.isDescending ? 1 : -1;
                } else {
                    return 0;
                }
            } else {
                let a_value = Number(a[column]?.replace(/[^\d.-]/g, ''));
                let b_value = Number(b[column]?.replace(/[^\d.-]/g, ''));
                if (a_value > b_value) {
                    return this.isDescending ? -1 : 1;
                } else if (a_value < b_value) {
                    return this.isDescending ? 1 : -1;
                } else {
                    return 0;
                }
            }
        });
    }
}

