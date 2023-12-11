import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configService } from '../service/config.service';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

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

export class ListInvestorComponent {
  message: string | undefined;
  items = table_contents;
  thb_mark = String.fromCharCode(3647);

  constructor(
    private http: HttpClient,
    private configService: configService,
    public auth: AuthService,
    private router: Router
    ) { }

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

  currency_style(amount: number) {
    let currency_amount = amount.toString();
    let thb_character = String.fromCharCode(3647);
    currency_amount = currency_amount.replace(/,/g, ''); // Remove existing commas
    currency_amount = currency_amount.replace(thb_character, ''); //Remove existing thb mark
    currency_amount = currency_amount.replace(' ', ''); //Remove existing spaces
    currency_amount = currency_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three numbers
    currency_amount = currency_amount.replace(currency_amount, thb_character + ' ' + currency_amount);
    return currency_amount;
  }

  /**
   * Add new investor only if user has admin token then only he can add the new investor
   * @author Satendra
   */
  addNewInvestor() {
    this.router.navigate(["manage-investor"]);
  }
}
