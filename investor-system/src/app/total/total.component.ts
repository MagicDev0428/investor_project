import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { InvestmentService } from '../service/investment.service';
import { Adam } from '../model/adam';
import * as moment from 'moment';
import { AuthService } from '@auth0/auth0-angular';

const temp1 = [
  {_id:'002', amountInvested:21200001, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:21200001, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'003', amountInvested:1200000, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:1200000, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'004', amountInvested:1200000, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:1200000, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'005', amountInvested:25200001, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:25200001, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'006', amountInvested:1200000, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:1200000, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'007', amountInvested:1200001, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:1200001, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'008', amountInvested:1200000, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:1200000, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'009', amountInvested:25200000, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:25200000, torbenmonthly:2, torbenPtofit:1200001},
  {_id:'010', amountInvested:1200001, profitMonthlyPct:2, profitMonthly:1200001, torbenInvested:1200001, torbenmonthly:2, torbenPtofit:1200001},

];

const temp2 = [
  { profitMonth:'Jun- 2023', totalProfitAmount:1200001},
  { profitMonth:'Jul - 2023', totalProfitAmount:1200001 },
  { profitMonth:'Aug - 2023', totalProfitAmount:1200001 },
  { profitMonth:'Sep - 2023', totalProfitAmount:1200001 },
  { profitMonth:'Oct - 2023', totalProfitAmount:1200001 },
  { profitMonth:'Nov - 2023', totalProfitAmount:1200001 },
  { profitMonth:'Dec - 2023', totalProfitAmount:1200001 },
  { profitMonth:'Jun - 2023', totalProfitAmount:1200001 },
  { profitMonth:'Jul - 2023', totalProfitAmount:1200001 }
];

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['../adam/investorForm.scss', './total.component.scss'],
})

export class TotalComponent extends BaseComponent {

  total: number = 172500000;
  items1: any = [];
  items2: any = [];
  totalInvestment: number = 89270000;
  totalProfit: number = 89270000;
  monthlyProfit: number = 2345678;


  selectedInvestment$!: Observable<string | number>;

  constructor(
    router: Router,
    auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService,
    private formBuilder: FormBuilder
  ) {
    super(router, auth);
  }

  ngOnInit(): void {
    this.total = this.currency_style(this.total);
    this.totalInvestment = this.currency_style(this.totalInvestment);
    this.totalProfit = this.currency_style(this.totalProfit);
    this.monthlyProfit = this.currency_style(this.monthlyProfit);
    this.items1 = temp1;
    this.items2 = temp2;
  }

  protected onSubmit(): void {

  }

  goList() {
    this.router.navigate(['/investment-list/']);
  }
}