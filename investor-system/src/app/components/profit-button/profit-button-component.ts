import { Component, Input } from '@angular/core';

const btnStyles = {
    red: 'btn btn-danger',
    yellow: 'btn btn-warning',
    green: 'btn btn-success'
}

@Component({
    selector: 'app-profit-button',
    templateUrl: './profit-button-component.html',
    styles: []
})
export class ProfitButtonComponent {
    @Input() profitStyle: string;
    btnStyle = btnStyles;
    myStyle = '';

    constructor() { }

    ngOnInit(): void {
        this.myStyle = this.btnStyle[this.profitStyle];
    }


}
