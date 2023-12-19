import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configService } from '../service/config.service';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { InvestorService } from '../service/investor.service';

interface Message {
  message?: string;
  err?: boolean;
  error?: string;
}

const table_contents = [
  {
    name: 'Mark Snowman (Mark)',
    amount: 1200000,
    profit: 123456,
    transfer_type: 'Envelop',
    next_profit: 'Nov-2023',
    email: 'mark@snowman.dk',
    facebook: '#',
    folder: '#',
    profitStyle: 'green'
  },
  {
    name: 'Torben Rudgaard (Torben)',
    amount: 1200000,
    profit: 123456,
    transfer_type: 'Thai Bank',
    next_profit: 'Nov-2023',
    email: 'torben@rudgaard.com',
    facebook: '#',
    folder: '#',
    profitStyle: 'yellow'
  },
  {
    name: 'Bee Primpajit (Bee)',
    amount: 1200000,
    profit: 123456,
    transfer_type: 'Direct Transfer',
    next_profit: 'Dec-2023',
    email: 'bee@sunnythailand.com',
    facebook: '#',
    folder: '#',
    profitStyle: 'red'
  },
  {
    name: 'Mark Snowman (Mark)',
    amount: 1200000,
    profit: 123456,
    transfer_type: 'Envelop',
    next_profit: 'Nov-2023',
    email: 'mark@snowman.dk',
    facebook: '#',
    folder: '#',
    profitStyle: 'green'
  },
  {
    name: 'Torben Rudgaard (Torben)',
    amount: 1200000,
    profit: 123456,
    transfer_type: 'Thai Bank',
    next_profit: 'Nov-2023',
    email: 'torben@rudgaard.com',
    facebook: '#',
    folder: '#',
    profitStyle: 'yellow'
  },
  {
    name: 'Bee Primpajit (Bee)',
    amount: 1200000,
    profit: 123456,
    transfer_type: 'Direct Transfer',
    next_profit: 'Nov-2023',
    email: 'bee@sunnythailand.com',
    facebook: '#',
    folder: '#',
    profitStyle: 'red'
  }
];

@Component({
  selector: 'app-list-investor',
  templateUrl: './list-investor.component.html',
  styleUrls: ['../adam/investorForm.scss', './list-investor.component.scss']
})

export class ListInvestorComponent extends BaseComponent {
  message: string | undefined;
  items: any[] = [];
  temp: any[] = [];

  constructor(
    private http: HttpClient,
    private configService: configService,
    public auth: AuthService,
    private router: Router,
    private investorService: InvestorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.investorService.getInvestors().subscribe((res) => {
      console.log('DATA->', res);
      this.items = res.investors.map((investor) => {
        // investor.createdDate = moment(adam.createdDate).format('DD-MMM-YYYY');
        // investor.amount = this.currency_style(adam.amount);
        return investor;
      });
      this.temp = this.items;
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
