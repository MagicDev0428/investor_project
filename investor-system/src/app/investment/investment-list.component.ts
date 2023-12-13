import { Component } from '@angular/core';

const table_contents = [
    {
        _no: '001',
        amount: 1200000,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: '18 Days',
        description: 'Adam offered 2.16% on a 5,000,000 investment'
    },
    {
        _no: '002',
        amount: 21200001,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: '42 Days',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '003',
        amount: 1200000,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: '280 Days',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '004',
        amount: 1200000,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: '370 Days',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '005',
        amount: 25200001,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: '492 Days',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '006',
        amount: 1200000,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: 'Unlimited',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '007',
        amount: 1200001,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: 'Unlimited',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '008',
        amount: 81200001,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: 'Unlimited',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '009',
        amount: 81200000,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: 'Unlimited',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
    {
        _no: '010',
        amount: 825200000,
        monthlyProfit: '2.00%',
        annualProfit: '2.00%',
        investmentEnds: 'Unlimited',
        description: 'Adam offered 3.16% on a 15,000,000 investment'
    },
];

@Component({
    selector: 'app-investment-list',
    templateUrl: './investment-list.component.html',
    styleUrls: ['../adam/investorForm.scss', './investment-list.component.scss'],
})

export class InvestmentListComponent {

    items = table_contents;
    total: number = 0;


    constructor(
    ) { }

    ngOnInit(): void {
    }

    currency_style(amount: any) {
        let currency_amount = amount?.toString();
        let thb_character = String.fromCharCode(3647);
        currency_amount = currency_amount.replace(/,/g, ''); // Remove existing commas
        currency_amount = currency_amount.replace(thb_character, ''); //Remove existing thb mark
        currency_amount = currency_amount.replace(' ', ''); //Remove existing spaces
        currency_amount = currency_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three numbers
        currency_amount = currency_amount.replace(currency_amount, thb_character + ' ' + currency_amount);
        return currency_amount;
    }

}
