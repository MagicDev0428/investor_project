import { Component, Injectable, ViewChild, forwardRef, Injector, Input } from '@angular/core';
import {
	NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDateStruct,
	NgbInputDatepicker
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { noop } from 'rxjs';
import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	NgControl,
} from '@angular/forms';
import * as moment from 'moment';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
function getShortMonthName(monthNumber: number): string {
	const months = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	return months[monthNumber - 1];
}

function convertToTwoDigitNumber(number: number): string {
	return number.toString().padStart(2, '0');
}


@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '-';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? convertToTwoDigitNumber(date.day) + this.DELIMITER + (date.month) + this.DELIMITER + date.year : null;
	}
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '-';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? convertToTwoDigitNumber(date.day) + this.DELIMITER + getShortMonthName(date.month) + this.DELIMITER + date.year : '';
	}
}

@Component({
	selector: 'ngbd-datepicker-adapter',
	templateUrl: './datepicker-adapter.html',

	// NOTE: For this example we are only providing current component, but probably
	// NOTE: you will want to provide your main App Module
	providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NgbdDatepickerAdapter),
			multi: true,
		},
	],
})
export class NgbdDatepickerAdapter {
	@ViewChild('d2') d2: NgbInputDatepicker;
	model1: string;
	model2: string;
	default: string;

	public ngControl: NgControl;

	private onTouched: () => void = noop;
	private onChange: (_: any) => void = noop;

	constructor(
		private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>,
		private inj: Injector
	) { }

	ngOnInit(): void {
		this.ngControl = this.inj.get(NgControl);
	}

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

	open() {
		this.d2.toggle();
	}

	writeValue(newModel: string) {
		if (newModel === '6 months notice') {
			this.default = newModel;
			this.onChange(null);
		}
		if ((typeof newModel === 'string') && (newModel !== '6 months notice')) {
			this.default = newModel;
			this.model2 = newModel;
			let formattedDate = moment(newModel, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm');
			this.onChange(formattedDate);
		}
	}

	onInputChange(event: any) {
		let value = event.target.value;
		let formattedDate = '';
		if (value) {
			formattedDate = moment(value, 'DD-MMM-YYYY').format('YYYY-MM-DDTHH:mm');
			this.model2 = moment(value, 'DD-MMM-YYYY').format('DD-MM-YYYY');
			if (formattedDate !== 'Invalid date') {
				this.onChange(formattedDate);
			} else {
				this.onChange(null);
			}
		} else {
			this.onChange(null);
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onDateChange($event: any) {
		let value = $event;
		let formattedDate = moment(value, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm');
		if (formattedDate !== 'Invalid date') {
			this.onChange(formattedDate);
		} else {
			this.onChange(null);
		}
	}
}
