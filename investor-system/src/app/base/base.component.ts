import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

export class BaseComponent {

    user: any = [];
    visited_routes: any = [];

    constructor(
        public router: Router,
        public auth: AuthService,
        public toastrService: ToastrService,
    ) {
        this.auth.user$.subscribe(result => {
            if (result !== null) {
                this.user = result['investor-system'];
            }
        });
    }

    currency_style(amount: any) {
        let currency_amount = amount?.toString();
        if (currency_amount === undefined) {
            currency_amount = '0';
        }
        let thb_character = String.fromCharCode(3647);
        currency_amount = currency_amount?.replace(/,/g, ''); // Remove existing commas
        currency_amount = currency_amount?.replace(thb_character, ''); //Remove existing thb mark
        currency_amount = currency_amount?.replace(' ', ''); //Remove existing spaces
        currency_amount = currency_amount?.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three numbers
        currency_amount = currency_amount?.replace(currency_amount, thb_character + currency_amount);
        return currency_amount;
    }

    profit_style(profit: number) {
        if (profit === undefined) {
            profit = 0;
        }
        let value = '0';
        const factor = Math.pow(10, 2);
        value = (Math.round(profit * factor) / factor).toFixed(2);
        value = value + '%';
        return value;
    }

    onlyNumbers(event: KeyboardEvent) {
        if (
            event.key !== "Backspace" &&
            event.key !== "Delete" &&
            event.key !== "ArrowLeft" &&
            event.key !== "ArrowRight" &&
            event.key !== "Tab" &&
            (event.key < "0" || event.key > "9")
        ) {
            event.preventDefault();
        }
    }

    goTo(routeStr) {
        this.router.navigate([routeStr]);
    }

    formatNumber(digit: number, value: number) {
        return value.toString().padStart(digit, '0');
    }

    goToPrev() {
        this.visited_routes = JSON.parse(localStorage.getItem('routes')) ?? [];
        let length = this.visited_routes.length;
        localStorage.removeItem('routes');
        if (length > 1) {
            this.visited_routes.pop();
            localStorage.setItem('routes', JSON.stringify(this.visited_routes));
            this.goTo(this.visited_routes[length - 2]);
        } else {
            this.visited_routes.pop();
            this.goTo('/');
        }
    }

    getYearsAndMonths(months: any) {
        if (!months) {
            return 'more than 6 months';
        }
        let duration = moment.duration(months, 'months');
        let years = duration.years();
        let remainingMonths = duration.months();
        let result = '';
        if (years > 1) {
            result = `${years} years`;
        } else if (years === 1) {
            result = `${years} year`;
        }
        if (remainingMonths > 1) {
            result += `, ${Math.floor(remainingMonths)} months`;
        } else if (remainingMonths === 1) {
            result += `, ${remainingMonths} month`;
        }
        return result;
    }

    formatDate(date, dateStyle) {
        return date ? moment(date).format(dateStyle) : "";
    }

    replaceSpaces(url: string): string {
        return decodeURIComponent(url);
    }

    /**
 * format bytes
 * @param bytes (File size in bytes)
 * @param decimals (Decimals point)
 */
    formatBytes(bytes, decimals = 0) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    copyToClipboard(text: string): void {
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        input.value = text;
        document.body.appendChild(input);

        input.select();
        input.setSelectionRange(0, input.value.length);

        document.execCommand('copy');

        document.body.removeChild(input);

        this.toastrService.success('Copied To Clipboard!');
    }

    generatePinCode(): number {
        let code = Math.floor(Math.random() * (99 - 10 + 1) + 10);
        return code * 101;
    }

    getPastMonthsAndYears(inputMonth: number, inputYear: number, numberOfMonth: number = 12): { month: string, year: number }[] {
        const monthsAndYears = [];
        let currentDate = moment({ year: inputYear, month: inputMonth - 1 }); // Create a moment object for the inputted month and year

        for (let i = 0; i < numberOfMonth; i++) {
            monthsAndYears.push({
                month: currentDate.format('MM'),
                monthName: currentDate.format('MMM'),
                year: currentDate.year()
            });
            currentDate = currentDate.subtract(1, 'month'); // Subtract 1 month for the next iteration
        }

        return monthsAndYears;
    }

    getFutureMonthsAndYears(startMonth: number, startYear: number, numberOfMonth: number = 12): { month: string, year: number }[] {
        const monthsAndYears = [];
        let currentDate = moment({ year: startYear, month: startMonth - 1 }); // Month is zero-based in Moment.js

        for (let i = 0; i < numberOfMonth; i++) {
            monthsAndYears.push({
                month: currentDate.format('MM'),
                monthName: currentDate.format('MMM'),
                year: currentDate.year()
            });
            currentDate.add(1, 'month'); // Move to the next month
        }
        monthsAndYears.reverse();
        return monthsAndYears;
    }

    isValidUrl(url: string): boolean {
        const pattern = new RegExp('^(https?:\\/\\/)?', 'i'); // fragment locator
        return !!pattern.test(url);
    }

    goToExternal(url: string = 'https://facebook.com/') {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        window.open(url);
    }
}

