import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { InvestorService } from '../service/investor.service';

@Component({
    selector: 'app-copy-paste',
    templateUrl: './copy-paste-area.component.html',
    styleUrls: ['../adam/investorForm.scss', './copy-paste-area.component.scss'],
})

export class CopyPasteAreaComponent extends BaseComponent implements OnInit {
    @Output() isShown = new EventEmitter<boolean>();
    @Input() params: any = {};

    userId: any = '';
    values: any = {
        text_1: '',
        text_2: '',
        text_3: '',
        text_4: '',
        text_5: '',
    };
    formData: any = {
        _id: '',
        copyPaste: []
    };
    createdDate = '';
    createdBy = '';
    modifiedDate = '';
    modifiedBy = '';

    protected submitted = false;

    constructor(
        router: Router,
        auth: AuthService,
        toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        private investorService: InvestorService,
        // private clipboard: Clipboard
    ) {
        super(router, auth, toastrService);
    }

    ngOnInit(): void {
        this.userId = this.params?.params?.userId;
        if (typeof this.userId !== 'undefined') {
            this.investorService.getCopyPaste(this.userId).subscribe({
                next: (res) => {
                    this.values = res.investorCopyPaste?.copyPaste;
                    this.formData = res.investorCopyPaste;
                },
                error: err => {
                    this.toastrService.error(err);
                },
                complete: () => console.log('There are no more action happen.')
            });
        }
    }

    protected onSubmit(): void {
        this.submitted = true;
        this.investorService.saveCopyPaste(this.formData).subscribe({
            next: (res) => {
                this.toastrService.success(`CopyPaste Data was successfully saved!`);
                this.isShown.emit(true);
            },
            complete: () => console.log('There are no more action happen.')
        });
    }

    getValue(event: any) {
        let id = event.target.id;
        if (id === 'text_1') {
            this.formData.copyPaste[0] = event.target.value;
        }
        if (id === 'text_2') {
            this.formData.copyPaste[1] = event.target.value;
        }
        if (id === 'text_3') {
            this.formData.copyPaste[2] = event.target.value;
        }
        if (id === 'text_4') {
            this.formData.copyPaste[3] = event.target.value;
        }
        if (id === 'text_5') {
            this.formData.copyPaste[4] = event.target.value;
        }
    }

    onClose() {
        this.isShown.emit(true);
    }
}
