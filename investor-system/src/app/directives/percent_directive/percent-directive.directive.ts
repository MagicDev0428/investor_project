import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appPercentDirective]'
})
export class PercentDirective {

    constructor(private el: ElementRef) { }

    @HostListener('focus') onFocus() {
        let pattern = /^(0+)([1-9]\d*(\.\d+)?|0\.\d*[1-9]\d*)%$/;
        let pattern2 = /^([1-9]\d*(\.\d+)?|0\.\d*[1-9]\d*)%$/;
        let value = this.el.nativeElement.value;
        value = value.replace(pattern, '$2%');
        this.el.nativeElement.value = value;
        if (!pattern2.test(this.el.nativeElement.value)) {
            this.el.nativeElement.value = '';
        }
    }
}