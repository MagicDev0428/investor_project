import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { InvestorService } from '../service/investor.service';
import { Observable, map } from 'rxjs';
import { Investor } from '../model/investor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';
import * as moment from "moment";

interface Message {
  message?: string;
  err?: boolean;
  error?: string;
}

const temp_data = {
  "status": 200,
  "err": false,
  "investors": [
    {
      "_id": "torben",
      "investor": {
        "_id": "torben",
        "status": "INVESTOR",
        "folders": [
          {
            "readonly": true,
            "image": null,
            "googleFileId": null,
            "passportFolderId": "1AigGl74Wp1KbQIp5xWJ1lRTaeSlzjbq5",
            "webLink": null
          }
        ],
        "attachments": [],
        "nickname": "sati",
        "address": "Hong Kong",
        "postcode": "1234",
        "email": "insram@gmail.com",
        "city": "Hong Kong",
        "country": "Thiland",
        "phone": "+98764324",
        "facebook": "facebook.com",
        "passport": null,
        "beneficiaryName": null,
        "beneficiaryEmail": "insram@gmail.com",
        "beneficiaryPhone": "+9834214",
        "transferType": "MIXED",
        "transferInfo": null,
        "currency": null,
        "createdDate": "2023-12-29T18:43:49.146Z",
        "modifiedDate": "2023-12-29T18:43:49.146Z",
        "investorFolderId": "15BkD6jVTaXK9X1YyTcKppB7HWJFkkUTf",
        "pincode": "5252",
        "hiddenRemark": "This is testing",
        "accountInvestments": {
          "_id": null,
          "firstInvestment": "2023-01-01T00:00:00.000Z",
          "totalMonthlyProfit": 240,
          "investForMonths": 15.047536910408837
        },
        "totalAmountInvested": {
          "_id": null,
          "totalInvestments": 246
        },
        "accountBalancesTotalDeposit": {
          "_id": null,
          "totalDeposit": 1871
        },
        "latestAccountBalances": {
          "_id": null,
          "latestBalance": [
            {
              "_id": "65826004906d735f6c4c969e",
              "profitMonthPaid": true,
              "transferMethod": "Foreign Bank",
              "attachments": [],
              "investorName": "torben",
              "profitMonth": "2023-12-25T00:00:00.000Z",
              "emailDate": null,
              "deposit": 379,
              "withdraw": 12,
              "transferDate": 0,
              "transactionFrom": "Torben",
              "transactionTo": "Bee",
              "transactionNo": "113",
              "description": "This is first balance",
              "hiddenRemark": null,
              "createdBy": "Insi",
              "modifiedBy": "Insi",
              "createdDate": "2023-12-20T03:31:16.378Z",
              "modifiedDate": "2023-12-23T21:53:40.728Z"
            }
          ]
        }
      }
    }
  ]
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

  investor: any = {
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
          this.investor = res.investors[0]?.investor;
          let firstDate = res.investors[0]?.investor?.accountInvestments?.firstInvestment;
          this.investor.firstInvestment = firstDate ? moment(firstDate).format('DD-MMM-YYYY') : "";
          this.investor.investFor = this.getYearsAndMonths(res.investors[0]?.investor?.accountInvestments?.investForMonths);
          this.investor.monthlyProfit = res.investors[0]?.investor?.accountInvestments?.totalMonthlyProfit ?? 0;
          let newPayment = res.investors[0]?.investor?.latestAccountBalances?.latestBalance[0]?.profitMonth;
          this.investor.newestPayment = newPayment ? moment(newPayment).format('DD-MMM-YYYY') : "";
          this.investor.totalProfit = res.investors[0]?.investor?.accountBalancesTotalDeposit?.totalDeposit ?? 0;
          this.investor.totalInvestment = res.investors[0]?.investor?.totalAmountInvested?.totalInvestments ?? 0;
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
