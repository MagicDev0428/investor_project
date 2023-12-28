import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InvestmentService } from '../service/investment.service';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-investment-list',
    templateUrl: './investment-list.component.html',
    styleUrls: ['../adam/investorForm.scss', './investment-list.component.scss'],
})

export class InvestmentListComponent extends BaseComponent {

    items = [];
    total: number = 0;
    temp: any[] = [];
    searchTerm: string = '';
    currentColumn: string = '';
    isDescending: boolean = false;

    constructor(
        router: Router,
        auth: AuthService,
        toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        private investmentService: InvestmentService,
    ) {
        super(router, auth, toastrService);
    }

    ngOnInit(): void {
        this.investmentService.investmentList().subscribe((res) => {
            this.items = res.investments.map((investment) => {
                investment.startDate = moment(investment.createdDate).format('DD-MMM-YYYY');
                investment.endDate = moment(investment.createdDate).format('DD-MMM-YYYY');
                investment.investAmount = investment.investAmount;
                return investment;
            });
            this.temp = this.items;
            this.temp.forEach(item => {
                this.total += item.investAmount;
            });
        });

    }

    onSearch(event: KeyboardEvent) {
        this.items = this.temp;
        this.items = this.items.filter(item => item.explanation?.toLowerCase().includes(this.searchTerm.toLowerCase()));
        if (this.searchTerm === "") {
            this.items = this.temp;
        }
    }

    goForm(id: string = '', page: string = '') {
        if (id.length === 0) {
            if (page === 'form') {
                this.router.navigate(['/investment-form']);
            }
        } else {
            if (page === 'info') {
                this.router.navigate(['/investment-info/' + id]);
            } else if (page === 'form') {
                this.router.navigate(['/investment-form/' + id]);
            }
        }
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

}
