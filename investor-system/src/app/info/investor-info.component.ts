import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { InvestorService } from '../service/investor.service';
import { Observable, map } from 'rxjs';
import { Investor } from '../model/investor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';

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

  selectedInvestor$!: Observable<string | number>;

  data = temp_data;
  userId;
  values: any = [];
  title = '';

  investor: Investor = {
    _id: undefined,
    name: '',
    nickname: '',
    phone: '',
    email: '',
    address: '',
    postcode: 0,
    city: '',
    country: '',
    status: '',
    facebook: '',
    passport: '',
    beneficiaryName: '',
    beneficiaryEmail: '',
    beneficiaryPhone: '',
    countryToTransfer: '',
    currency: '',
    reason: '',
    passportImages: undefined,
    pincode: 0,
    isAdmin: false,
    transferType: '',
    transferInfo: '',
    investorFolderId: ''
  }

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investorService: InvestorService,
  ) {
    super(router, auth, toastrService);
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res;
    })
  }

  ngOnInit() {
    if (typeof this.userId !== 'undefined') {
      this.investorService.getInvestorInfo(this.userId).subscribe({
        next: (res) => {
          this.values = res.investors[0]?.investor;
          this.investor = this.values;
          this.title = `${this.investor._id} \"\ ${this.investor.nickname} \"\ `;
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

}
