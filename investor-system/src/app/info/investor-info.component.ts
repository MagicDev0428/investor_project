import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

interface Message {
  message?: string;
  err?: boolean;
  error?: string;
}

const temp_data = {
    nickname: "Mark",
    name: "Mark Sejr Snowman",
    phone: "+66 123-123-1234",
    address: "Nakula Road Soi 16/2 Gai, Nakia \nBangulamung Region \n20120 Pattaya \nThailand",
    email: "bee@sunnythailand.com",
    zipcode: "20120",
    city: "Pattaya",
    country: "Thailand",
    first_invest: "01-Feb-2023",
    invest_for: "5 years, 2 months",
    transfer_info: "K-Bank (Central Branch) \nMr. Mark Sejr Snowman \n552-1-034547",
    monthly_profit: 123465,
    new_pay: "16-Nov-2023",
    total_profit: 123456,
    total_invest: 1200000
}

@Component({
  selector: 'app-investor-info',
  templateUrl: './investor-info.component.html',
  styleUrls: ['./investor-info.component.scss']
})

export class InvestorInfoComponent {
  
    data = temp_data;

  constructor() { }

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
}
