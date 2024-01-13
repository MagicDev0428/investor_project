import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appCurrencyDirective]'
})
export class CurrencyDirective {

    constructor(private el: ElementRef) { }
    start: number = 0;
    end: number = 0;

    @HostListener('focus') onFocus() {
        let pattern = /^[0\s]+$/;
        let value = this.el.nativeElement.value;
        value = value.replace(/[^0-9]/g, '');

        if (pattern.test(value)) {
            this.el.nativeElement.value = '';
        }
    }
}