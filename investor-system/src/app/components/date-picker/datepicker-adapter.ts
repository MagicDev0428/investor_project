import { Component, Injectable, ViewChild, forwardRef, Injector } from '@angular/core';
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

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
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
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
	}
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

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
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
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
		if(typeof newModel === 'string') {
			this.model2 = newModel;
			this.onChange(this.model2);
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onDateChange($event: any) {
        let value = $event
		let formattedDate = moment(value, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm');
		this.onChange(formattedDate);
    }
}
