import { Component, Input } from '@angular/core';

const btnStyles = {
    Red: 'btn btn-danger',
    Yellow: 'btn btn-warning',
    Green: 'btn btn-success'
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
