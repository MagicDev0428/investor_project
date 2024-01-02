import { Component, Output, Input, EventEmitter, forwardRef, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

const btnStyles = {
    red: 'btn btn-danger',
    yellow: 'btn btn-warning',
    green: 'btn btn-success'
}

@Component({
    selector: 'app-month-selector',
    templateUrl: './month-selector.component.html',
    styleUrls: ['./month-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MonthSelectorComponent),
            multi: true
        }
    ]
})
export class MonthSelectorComponent extends BaseComponent implements ControlValueAccessor {
    @Input() sectionHidden: boolean = false;
    @Input() isDropdownOpen: boolean = false;
    @Input() numberOfMonth: number = 12;
    @Input() startMonth: any;
    @Input() formControlName: string;
    @Output() selectedMonth = new EventEmitter<any>();

    @ViewChild('myInput') myInput: ElementRef;
    private isInputFocused = false;

    onMouseDown() {
        this.isInputFocused = true;
        setTimeout(() => {
            if (!this.isInputFocused) {
                this.onFocusOut();
            }
        }, 0);
    }

    @HostListener('document:click', ['$event.target'])

    onDocumentClick(target: EventTarget) {
        if (target !== this.myInput.nativeElement) {
            this.isInputFocused = false;
            this.onFocusOut();
        }
    }

    onFocusOut() {
        this.isDropdownOpen = false;
        // Additional logic for focus out event
    }

    currentMonth: any = {
        month: '',
        monthName: '',
        year: '2023'
    }

    selectedOption: string = 'Select a Month';
    pastMonths: any = [];
    value: string = '';

    constructor(
        router: Router,
        auth: AuthService,
        toastrService: ToastrService,
        private elementRef: ElementRef,
    ) {
        super(router, auth, toastrService);
    }

    ngOnInit(): void {
        this.currentMonth.monthName = moment(new Date()).format('MMM');
        this.currentMonth.month = moment(new Date()).format('MM');
        this.currentMonth.year = moment(new Date()).format('YYYY');
        if (this.startMonth !== undefined) {
            this.currentMonth = this.startMonth;
        }
        this.selectedMonth.emit(this.currentMonth);
        this.selectedOption = this.currentMonth.monthName + ' ' + this.currentMonth.year;
        this.pastMonths = this.getPastMonthsAndYears(Number(this.currentMonth.month), Number(this.currentMonth.year), this.numberOfMonth);
    }

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
        this.pastMonths = this.pastMonths.filter(() => false);
        this.pastMonths = this.getPastMonthsAndYears(Number(this.currentMonth.month), Number(this.currentMonth.year), this.numberOfMonth);
    }

    selectOption(option: any): void {
        this.selectedOption = option.monthName + ' ' + option.year;
        this.currentMonth.monthName = option.monthName;
        this.currentMonth.month = option.month;
        this.currentMonth.year = option.year;
        this.selectedMonth.emit(this.currentMonth);
        this.pastMonths = this.pastMonths.filter(() => false);
        this.pastMonths = this.getPastMonthsAndYears(option.month, option.year, this.numberOfMonth);
        this.isDropdownOpen = false;
    }

    onChangeRange(event: Event, direction: string) {
        event.stopPropagation();
        if (direction === 'up') {
            let firstMonth = this.pastMonths[0];
            this.pastMonths = this.pastMonths.filter(() => false);
            this.pastMonths = this.getFutureMonthsAndYears(firstMonth.month, firstMonth.year, this.numberOfMonth);
        } else if (direction === 'down') {
            let lastMonth = this.pastMonths.pop();
            this.pastMonths = this.pastMonths.filter(() => false);
            this.pastMonths = this.getPastMonthsAndYears(lastMonth.month, lastMonth.year, this.numberOfMonth);
        }
    }

    inputFocus(event: Event) {
        this.isDropdownOpen = true;
    }

    inputBlur(event: Event) {
        this.isDropdownOpen = false;
    }

    // ControlValueAccessor methods
    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Optional: Implement if needed
    }

    private onChange: (value: any) => void = () => { };
    private onTouched: () => void = () => { };
}
