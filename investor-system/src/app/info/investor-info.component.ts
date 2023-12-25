import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';

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

export class InvestorInfoComponent extends BaseComponent {

  data = temp_data;

  constructor(
    private router: Router,
  ) {
    super();
  }

  goList() {
    this.router.navigate(['/list/']);
  }
}
