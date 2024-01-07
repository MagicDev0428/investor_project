import { Component, Input } from '@angular/core';

const btnStyles = {
    red: 'btn btn-danger text-nowrap',
    yellow: 'btn btn-warning text-nowrap',
    green: 'btn btn-success text-nowrap'
}

@Component({
    selector: 'app-profit-button',
    templateUrl: './profit-button-component.html',
    styles: []
})
export class ProfitButtonComponent {
    @Input() profitStyle: string;
    @Input() text: string = '11-Nov-2023';
    btnStyle = btnStyles;
    myStyle = '';

    constructor() { }

    ngOnInit(): void {
        this.myStyle = this.btnStyle[this.profitStyle];
    }


}
