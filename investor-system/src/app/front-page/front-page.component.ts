import { Component, OnInit } from '@angular/core';
import { temp_data } from './temp-data';


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})

export class FrontPageComponent {

  data = temp_data;

  constructor() {

  }

  ngOnInit() {

  }

  currency_style(amount: any) {
    let currency_amount = amount.toString();
    let thb_character = String.fromCharCode(3647);
    currency_amount = currency_amount.replace(/,/g, ''); // Remove existing commas
    currency_amount = currency_amount.replace(thb_character, ''); //Remove existing thb mark
    currency_amount = currency_amount.replace(' ', ''); //Remove existing spaces
    currency_amount = currency_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three numbers
    currency_amount = currency_amount.replace(currency_amount, thb_character + ' ' + currency_amount);
    return currency_amount;
  }
}
