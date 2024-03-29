import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configService } from '../../service/config.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BaseComponent } from '../../base/base.component';
import { InvestorService } from '../../service/investor.service';
import { ToastrService } from 'ngx-toastr';

interface Message {
  message?: string;
  err?: boolean;
  error?: string;
}

@Component({
  selector: 'app-list-investor',
  templateUrl: './list-investor.component.html',
  styleUrls: ['../../adam/investorForm.scss', './list-investor.component.scss']
})

export class ListInvestorComponent extends BaseComponent {
  message: string | undefined;
  items: any[] = [];
  temp: any[] = [];
  searchTerm: string = '';
  currentColumn: string = '';
  isDescending: boolean = false;

  constructor(
    auth: AuthService,
    router: Router,
    toastrService: ToastrService,
    private http: HttpClient,
    private configService: configService,
    private investorService: InvestorService
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit(): void {
    this.investorService.getInvestors().subscribe((res) => {
      this.items = res.investors.map((investor) => {
        investor = investor.investor;
        investor.name = investor?._id;
        investor.amount = investor?.accountInvestments?.totalInvested;
        investor.profit = investor?.accountInvestments?.totalProfitMonthly;
        investor.nextProfit = '';
        let nextProfit = investor?.accountBalances?.nextMonth??'';
        if(nextProfit !== '') {
          investor.nextProfit = moment(nextProfit).format('MMM-YYYY');
        }
        investor.btnColor = investor?.accountBalances?.buttonColor?.toLowerCase()??'';
        if(investor.amount === undefined) {
          investor.amount = 0;
        }
        if(investor.profit === undefined) {
          investor.profit = 0;
        }
        return investor;
      });
      this.temp = this.items;
    });
  }

  onSearch(event: KeyboardEvent) {
    this.items = this.temp;
    this.items = this.items.filter(item => item.name?.toLowerCase().includes(this.searchTerm.toLowerCase()));
    if (this.searchTerm === "") {
      this.items = this.temp;
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

  callProtectedEndpoint(): void {
    this.http
      .get<Message>(`${environment.apiUrl}/private`)
      .subscribe({
        next: result => {
          if (result.err) {
            this.message = result.error as string;
          } else {
            this.message = result.message as string;
          }
        },
        error: error => {
          console.log({ error })
          this.message = error.error
        }
      });
  }

  callPublicEndpoint(): void {
    this.http
      .get<Message>(`${environment.apiUrl}`)
      .subscribe(result => {
        this.message = result.message;
      });
  }

  /**
   * Add new investor only if user has admin token then only he can add the new investor
   * @author Satendra
   */
  addNewInvestor() {
    this.router.navigate(["manage-investor"]);
  }
}
