import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-copy-paste',
    templateUrl: './copy-paste-area.component.html',
    styleUrls: ['../adam/investorForm.scss', './copy-paste-area.component.scss'],
})

export class CopyPasteAreaComponent extends BaseComponent implements OnInit {
    @Output() isShown = new EventEmitter<boolean>();

    userId: any = '';
    values = {
        text_1: '',
        text_2: '',
        text_3: '',
        text_4: '',
        text_5: '',
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
        // private clipboard: Clipboard
    ) {
        super(router, auth, toastrService);
    }

    ngOnInit(): void {
        this.auth.user$.subscribe(result => {
            this.user = result['investor-system'];
        });
    }

    deleteTransaction(_id: any) {

    }

    checkSelect() {

    }

    protected onSubmit(): void {
        this.submitted = true;
    }

    getValue(event: any) {
        let id = event.target.id;
        this.values[id] = event.target.value;
    }

    onClose() {
        this.isShown.emit(true);
    }
}
