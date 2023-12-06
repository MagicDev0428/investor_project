import { Component } from '@angular/core';

const table_contents = [
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: '$1,200,000',
        t_description: 'Transfered directly to Adam',
        t_direction: false
    },
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: '$1,200,001',
        t_description: 'Torben keep as part of profit',
        t_direction: true
    }, 
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: '$1,200,000',
        t_description: 'Transfered directly to Adam',
        t_direction: false
    }, 
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: '$1,200,000',
        t_description: 'Transfered directly to Adam',
        t_direction: true
    }, 
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: '$1,200,001',
        t_description: 'Adam transfer august profit to Torben',
        t_direction: true
    }, 
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: '$1,200,000',
        t_description: 'Transfered directly to Adam',
        t_direction: false
    }, 
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: '$1,200,001',
        t_description: 'Torben keep as part of profit',
        t_direction: true
    }, 
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: '$1,200,000',
        t_description: 'Transfered directly to Adam',
        t_direction: false
    }, 
    {
        t_date: '01-Feb-2019',
        t_from: 'ADAM',
        t_to: 'TORBEN',
        t_amount: '$1,200,000',
        t_description: 'Transfered directly to Adam',
        t_direction: false
    }, 
    {
        t_date: '01-Apr-2019',
        t_from: 'TORBEN',
        t_to: 'ADAM',
        t_amount: '$1,200,001',
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

}
