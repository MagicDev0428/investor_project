import { Component } from '@angular/core';

const table_contents = [
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: 1200000,
        t_description: 'Transfered directly to Adam',
        t_direction: false
    },
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: 1200001,
        t_description: 'Torben keep as part of profit',
        t_direction: true
    },
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: 1200000,
        t_description: 'Transfered directly to Adam',
        t_direction: false
    },
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: 1200000,
        t_description: 'Transfered directly to Adam',
        t_direction: true
    },
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: 1200001,
        t_description: 'Adam transfer august profit to Torben',
        t_direction: true
    },
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: 1200000,
        t_description: 'Transfered directly to Adam',
        t_direction: false
    },
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: 1200001,
        t_description: 'Torben keep as part of profit',
        t_direction: true
    },
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: 1200000,
        t_description: 'Transfered directly to Adam',
        t_direction: false
    },
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: 1200000,
        t_description: 'Transfered directly to Adam',
        t_direction: false
    },
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: 1200001,
        t_description: 'Adam transfer august profit to Torben',
        t_direction: true
    },
];

@Component({
    selector: 'app-adam-table',
    templateUrl: './adam-table.component.html',
    styleUrls: ['investorForm.scss', './adam-table.component.scss'],
})

export class AdamTableComponent {

    items = table_contents;


    constructor(
    ) { }

    ngOnInit(): void {
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

}
