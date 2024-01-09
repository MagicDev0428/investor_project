import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { InvestorService } from '../service/investor.service';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

const temp = {
  "err": false,
  "investors": [
      {
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
              "transferType": "Thai Bank",
              "transferInfo": null,
              "currency": null,
              "createdDate": "2023-12-29T18:43:49.146Z",
              "modifiedDate": "2024-01-04T15:02:31.319Z",
              "investorFolderId": "15BkD6jVTaXK9X1YyTcKppB7HWJFkkUTf",
              "pincode": "5252",
              "hiddenRemark": "No\nThis is not testing",
              "copyPaste": [
                  "This is test copy paste",
                  "This is test copy paste 2",
                  "1111",
                  "2222",
                  "3333",
                  "4444",
                  "5555"
              ],
              "accountInvestments": {
                  "_id": null,
                  "allInvestments": 938,
                  "totalProfitMonthly": 240,
                  "totalProfitEnd": 40,
                  "newMyInvestments": [
                      {
                          "_id": "6580fe9baa0a4e58549a379a",
                          "documents": [],
                          "investmentNo": 113,
                          "investorName": "torben",
                          "amountInvested": 123,
                          "transferDate": null,
                          "transactionFrom": null,
                          "transactionTo": null,
                          "transactionNo": null,
                          "profitMonthlyPct": 10,
                          "profitMonthly": 120,
                          "profitAnnualPct": 1230,
                          "profitAnnual": 12,
                          "profitEndPct": 32,
                          "profitEnd": 10,
                          "investType": "Mixed",
                          "firstProfitDate": "2023-03-01T00:00:00.000Z",
                          "lastProfitDate": "2024-06-01T00:00:00.000Z",
                          "payBackDate": "2024-02-15T00:00:00.000Z",
                          "torbenMonthlyPct": 123,
                          "torbenMonthly": 123,
                          "torbenAnnualPct": 98,
                          "torbenAnnual": 12,
                          "torbenEndPct": 11,
                          "torbenEnd": 2,
                          "description": "This is my investment updated route",
                          "createdDate": "2023-12-19T00:00:00.000Z",
                          "createdBy": "Insrram",
                          "modifiedDate": "2024-01-04T23:44:12.768Z",
                          "modifiedBy": "Insram",
                          "startDate": "2024-01-07T00:00:00.000Z",
                          "newInvestment": true
                      }
                  ],
                  "myInvestmentList": [
                      {
                          "_id": "6580fe9baa0a4e58549a379a",
                          "documents": [],
                          "investmentNo": 113,
                          "investorName": "torben",
                          "amountInvested": 123,
                          "transferDate": null,
                          "transactionFrom": null,
                          "transactionTo": null,
                          "transactionNo": null,
                          "profitMonthlyPct": 10,
                          "profitMonthly": 120,
                          "profitAnnualPct": 1230,
                          "profitAnnual": 12,
                          "profitEndPct": 32,
                          "profitEnd": 10,
                          "investType": "Mixed",
                          "firstProfitDate": "2023-03-01T00:00:00.000Z",
                          "lastProfitDate": "2024-06-01T00:00:00.000Z",
                          "payBackDate": "2024-02-15T00:00:00.000Z",
                          "torbenMonthlyPct": 123,
                          "torbenMonthly": 123,
                          "torbenAnnualPct": 98,
                          "torbenAnnual": 12,
                          "torbenEndPct": 11,
                          "torbenEnd": 2,
                          "description": "This is my investment updated route",
                          "createdDate": "2023-12-19T00:00:00.000Z",
                          "createdBy": "Insrram",
                          "modifiedDate": "2024-01-04T23:44:12.768Z",
                          "modifiedBy": "Insram",
                          "startDate": "2024-01-07T00:00:00.000Z"
                      },
                      {
                          "_id": "6585e0b71906863100968267",
                          "documents": [],
                          "investmentNo": 113,
                          "investorName": "torben",
                          "amountInvested": 123,
                          "transferDate": null,
                          "transactionFrom": null,
                          "transactionTo": null,
                          "transactionNo": null,
                          "profitMonthlyPct": 10,
                          "profitMonthly": 120,
                          "profitAnnualPct": 1230,
                          "profitAnnual": 12,
                          "profitEndPct": 32,
                          "profitEnd": 10,
                          "investType": "Mixed",
                          "firstProfitDate": "2023-03-01T00:00:00.000Z",
                          "lastProfitDate": "2024-06-01T00:00:00.000Z",
                          "payBackDate": "2024-02-15T00:00:00.000Z",
                          "torbenMonthlyPct": 123,
                          "torbenMonthly": 123,
                          "torbenAnnualPct": 98,
                          "torbenAnnual": 12,
                          "torbenEndPct": 11,
                          "torbenEnd": 2,
                          "description": "This is my investment updated route",
                          "createdDate": "2023-12-22T19:17:10.997Z",
                          "modifiedDate": "2024-01-01T17:52:11.855Z",
                          "startDate": "2023-03-01T00:00:00.000Z"
                      },
                      {
                          "_id": "6585e55fb9e97e6df447492e",
                          "documents": [],
                          "investmentNo": 113,
                          "investorName": "torben",
                          "amountInvested": 123,
                          "transferDate": null,
                          "transactionFrom": null,
                          "transactionTo": null,
                          "transactionNo": null,
                          "profitMonthlyPct": 10,
                          "profitMonthly": 120,
                          "profitAnnualPct": 1230,
                          "profitAnnual": 12,
                          "profitEndPct": 32,
                          "profitEnd": 10,
                          "investType": "Annual Profit",
                          "firstProfitDate": null,
                          "lastProfitDate": null,
                          "payBackDate": null,
                          "torbenMonthlyPct": 123,
                          "torbenMonthly": 123,
                          "torbenAnnualPct": 98,
                          "torbenAnnual": 12,
                          "torbenEndPct": 11,
                          "torbenEnd": 2,
                          "description": "This is my investment updated route",
                          "createdDate": "2023-12-22T19:37:03.730Z",
                          "modifiedDate": "2023-12-23T20:37:51.119Z"
                      },
                      {
                          "_id": "65999c47b0585e228c7a550c",
                          "documents": [],
                          "investmentNo": 113,
                          "investorName": "torben",
                          "amountInvested": 123,
                          "transferDate": "2023-12-27T00:00:00.000Z",
                          "transactionFrom": null,
                          "transactionTo": null,
                          "transactionNo": null,
                          "profitMonthlyPct": 10,
                          "profitMonthly": 120,
                          "profitAnnualPct": 1230,
                          "profitAnnual": 12,
                          "profitEndPct": 32,
                          "profitEnd": 10,
                          "investType": null,
                          "firstProfitDate": null,
                          "lastProfitDate": null,
                          "payBackDate": null,
                          "torbenMonthlyPct": 123,
                          "torbenMonthly": 123,
                          "torbenAnnualPct": 98,
                          "torbenAnnual": 12,
                          "torbenEndPct": 11,
                          "torbenEnd": 2,
                          "description": "This is my investment updated",
                          "createdDate": "2024-01-06T18:30:31.127Z",
                          "modifiedDate": "2024-01-06T18:30:31.127Z"
                      },
                      {
                          "_id": "659c129361ff443143f51c3a",
                          "documents": [],
                          "investmentNo": 2,
                          "investorName": "torben",
                          "amountInvested": 234,
                          "transferDate": "2024-01-08T22:00:00.000Z",
                          "transactionFrom": "345",
                          "transactionTo": "14",
                          "transactionNo": null,
                          "investType": null,
                          "firstProfitDate": null,
                          "lastProfitDate": null,
                          "payBackDate": null,
                          "description": null,
                          "createdDate": "2024-01-08T15:19:47.394Z",
                          "createdBy": "Bruzhmelov Oleh",
                          "modifiedDate": "2024-01-08T15:19:47.394Z",
                          "modifiedBy": ""
                      },
                      {
                          "_id": "659c4c40a579fa42dfcbc747",
                          "documents": [],
                          "investmentNo": 2,
                          "investorName": "torben",
                          "amountInvested": 212,
                          "transferDate": null,
                          "transactionFrom": "wef",
                          "transactionTo": "wef",
                          "transactionNo": "123",
                          "investType": "Annual Profit",
                          "firstProfitDate": null,
                          "lastProfitDate": null,
                          "payBackDate": null,
                          "description": null,
                          "createdDate": "2024-01-08T19:25:52.959Z",
                          "createdBy": "Bruzhmelov Oleh",
                          "modifiedDate": "2024-01-08T19:25:52.959Z",
                          "modifiedBy": ""
                      }
                  ]
              },
              "accountBalances": {
                  "_id": null,
                  "totalProfitPaid": 1871,
                  "totalWithdraw": 96,
                  "total_balance": 1775,
                  "investorBalanceList": [
                      {
                          "_id": "659111103aab0d2fc0e8b052",
                          "profitMonthPaid": false,
                          "transferMethod": "Foreign Bank",
                          "attachments": [],
                          "investorName": "torben",
                          "profitMonth": "2023-11-10T00:00:00.000Z",
                          "emailDate": null,
                          "deposit": 500,
                          "withdraw": 12,
                          "transferDate": 0,
                          "transactionFrom": "Torben",
                          "transactionTo": "Bee",
                          "transactionNo": "113",
                          "description": "This is first balance",
                          "hiddenRemark": null,
                          "createdBy": "Insram",
                          "modifiedBy": "Insram",
                          "createdDate": "2023-12-31T06:58:23.976Z",
                          "modifiedDate": "2023-12-31T06:58:23.976Z",
                          "balanceInThai": 500
                      },
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
                          "modifiedDate": "2023-12-23T21:53:40.728Z",
                          "balanceInThai": 879
                      },
                      {
                          "_id": "658517184b8d8f3f70bd21f7",
                          "profitMonthPaid": false,
                          "transferMethod": "Foreign Bank",
                          "attachments": [],
                          "investorName": "torben",
                          "profitMonth": "2023-12-31T19:00:00.000Z",
                          "emailDate": null,
                          "deposit": 123,
                          "withdraw": 12,
                          "transferDate": 0,
                          "transactionFrom": "Torben",
                          "transactionTo": "Bee",
                          "transactionNo": "113",
                          "description": "This is first balance",
                          "hiddenRemark": null,
                          "createdBy": "Insram",
                          "modifiedBy": "Insram",
                          "createdDate": "2023-12-22T04:56:56.336Z",
                          "modifiedDate": "2023-12-22T04:56:56.336Z",
                          "balanceInThai": 1002
                      },
                      {
                          "_id": "658518124b8d8f3f70bd21fa",
                          "profitMonthPaid": false,
                          "transferMethod": "Foreign Bank",
                          "attachments": [],
                          "investorName": "torben",
                          "profitMonth": "2023-12-31T19:00:00.000Z",
                          "emailDate": "1970-01-01T00:00:00.000Z",
                          "deposit": 123,
                          "withdraw": 12,
                          "transferDate": 0,
                          "transactionFrom": "Torben",
                          "transactionTo": "Bee",
                          "transactionNo": "113",
                          "description": "This is first balance",
                          "hiddenRemark": null,
                          "createdBy": "Insram",
                          "modifiedBy": "Insram",
                          "createdDate": "2023-12-22T05:01:06.727Z",
                          "modifiedDate": "2023-12-22T05:01:06.727Z",
                          "balanceInThai": 1125
                      },
                      {
                          "_id": "658518254b8d8f3f70bd21fd",
                          "profitMonthPaid": false,
                          "transferMethod": "Foreign Bank",
                          "attachments": [],
                          "investorName": "torben",
                          "profitMonth": "2023-12-31T19:00:00.000Z",
                          "emailDate": null,
                          "deposit": 123,
                          "withdraw": 12,
                          "transferDate": 0,
                          "transactionFrom": "Torben",
                          "transactionTo": "Bee",
                          "transactionNo": "113",
                          "description": "This is first balance",
                          "hiddenRemark": null,
                          "createdBy": "Insram",
                          "modifiedBy": "Insram",
                          "createdDate": "2023-12-22T05:01:25.633Z",
                          "modifiedDate": "2023-12-22T05:01:25.633Z",
                          "balanceInThai": 1248
                      },
                      {
                          "_id": "65852a0cd5605d2f94984edf",
                          "profitMonthPaid": false,
                          "transferMethod": "Foreign Bank",
                          "attachments": [],
                          "investorName": "torben",
                          "profitMonth": "2023-12-31T19:00:00.000Z",
                          "emailDate": null,
                          "deposit": 123,
                          "withdraw": 12,
                          "transferDate": 0,
                          "transactionFrom": "Torben",
                          "transactionTo": "Bee",
                          "transactionNo": "113",
                          "description": "This is first balance",
                          "hiddenRemark": null,
                          "createdBy": "Insram",
                          "modifiedBy": "Insram",
                          "createdDate": "2023-12-22T06:17:34.592Z",
                          "modifiedDate": "2023-12-22T06:17:34.592Z",
                          "balanceInThai": 1371
                      },
                      {
                          "_id": "65852d631c4fd24cf47f52b1",
                          "profitMonthPaid": false,
                          "transferMethod": "Foreign Bank",
                          "attachments": [],
                          "investorName": "torben",
                          "profitMonth": "2023-12-31T19:00:00.000Z",
                          "emailDate": null,
                          "deposit": 0,
                          "withdraw": 12,
                          "transferDate": 0,
                          "transactionFrom": "Torben",
                          "transactionTo": "Bee",
                          "transactionNo": "113",
                          "description": "This is first balance",
                          "hiddenRemark": null,
                          "createdBy": "Insram",
                          "modifiedBy": "Insram",
                          "createdDate": "2023-12-22T06:32:03.523Z",
                          "modifiedDate": "2023-12-22T06:32:03.523Z",
                          "balanceInThai": 1359
                      },
                      {
                          "_id": "659249dfad2f7f6bc4f0662c",
                          "profitMonthPaid": false,
                          "transferMethod": "Foreign Bank",
                          "attachments": [],
                          "investorName": "torben",
                          "profitMonth": "2024-01-01T00:00:00.000Z",
                          "emailDate": null,
                          "deposit": 500,
                          "withdraw": 12,
                          "transferDate": 0,
                          "transactionFrom": "Torben",
                          "transactionTo": "Bee",
                          "transactionNo": "113",
                          "description": "This is first balance",
                          "hiddenRemark": null,
                          "createdBy": "Insram",
                          "modifiedBy": "Insram",
                          "createdDate": "2024-01-01T05:13:03.666Z",
                          "modifiedDate": "2024-01-01T05:13:03.666Z",
                          "balanceInThai": 1859
                      },
                      {
                          "_id": "6580fe9baa0a4e58549a379a",
                          "documents": [],
                          "investmentNo": 113,
                          "investorName": "torben",
                          "amountInvested": 123,
                          "transferDate": null,
                          "transactionFrom": null,
                          "transactionTo": null,
                          "transactionNo": null,
                          "profitMonthlyPct": 10,
                          "profitMonthly": 120,
                          "profitAnnualPct": 1230,
                          "profitAnnual": 12,
                          "profitEndPct": 32,
                          "profitEnd": 10,
                          "investType": "Mixed",
                          "firstProfitDate": "2023-03-01T00:00:00.000Z",
                          "lastProfitDate": "2024-06-01T00:00:00.000Z",
                          "payBackDate": "2024-02-15T00:00:00.000Z",
                          "torbenMonthlyPct": 123,
                          "torbenMonthly": 123,
                          "torbenAnnualPct": 98,
                          "torbenAnnual": 12,
                          "torbenEndPct": 11,
                          "torbenEnd": 2,
                          "description": "This is my investment updated route",
                          "createdDate": "2023-12-19T00:00:00.000Z",
                          "createdBy": "Insrram",
                          "modifiedDate": "2024-01-04T23:44:12.768Z",
                          "modifiedBy": "Insram",
                          "startDate": "2024-01-07T00:00:00.000Z",
                          "newInvestment": true,
                          "balanceInThai": 1859
                      }
                  ]
              },
              "newestBalance": {
                  "_id": "659249dfad2f7f6bc4f0662c",
                  "profitMonthPaid": false,
                  "transferMethod": "Foreign Bank",
                  "attachments": [],
                  "investorName": "torben",
                  "profitMonth": "2024-01-01T00:00:00.000Z",
                  "emailDate": null,
                  "deposit": 500,
                  "withdraw": 12,
                  "transferDate": 0,
                  "transactionFrom": "Torben",
                  "transactionTo": "Bee",
                  "transactionNo": "113",
                  "description": "This is first balance",
                  "hiddenRemark": null,
                  "createdBy": "Insram",
                  "modifiedBy": "Insram",
                  "createdDate": "2024-01-01T05:13:03.666Z",
                  "modifiedDate": "2024-01-01T05:13:03.666Z"
              },
              "profitInPercentage": 199.4669509594883
          }
      }
  ]
}

@Component({
  selector: 'app-investor-portfolio',
  templateUrl: './investor-portfolio.component.html',
  styleUrls: ['../adam/investorForm.scss', './investor-portfolio.component.scss'],
})

export class InvestorPortfolioComponent extends BaseComponent {

  amount = '';
  userId: any = 'Mark Sejr Snowman (Mark)';
  investor: any = {};
  investments: any = [];
  profit_balance: any = [];

  selectedInvestor$!: Observable<string | number>;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investorService: InvestorService,
    private formBuilder: FormBuilder,
  ) {
    super(router, auth, toastrService);
    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      this.userId = res ?? 'None';
    });
  }

  ngOnInit(): void {
    if (this.userId !== 'None') {
      this.investorService.getInvestorPortfolio(this.userId).subscribe({
        next: (res) => {
          this.investor = temp.investors[0]?.investor;
          let newPayment = this.investor?.newestBalance?.profitMonth;
          this.investor.newestPayment = newPayment ? moment(newPayment).format('DD-MMM-YYYY') : "";
          this.investments = this.investor?.accountInvestments;
          this.investments.all_investment = this.investor?.accountInvestments?.allInvestments;
          this.investments.totalProfitPaid = this.investor?.accountBalances?.totalProfitPaid;
          this.investments.totalProfitPaidPct = this.investor?.profitInPercentage;
          this.profit_balance = this.investor?.accountBalances;
          this.profit_balance.monthlyProfit = this.investor?.accountInvestments?.totalProfitMonthly;
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }
}
