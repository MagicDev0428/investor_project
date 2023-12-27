import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-adam-form',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['../adam/investorForm.scss', './hidden-text.component.scss'],
})

export class HiddenTextComponent extends BaseComponent implements OnInit {
  @ViewChild('transactionFrom') transactionFrom: ElementRef;
  @ViewChild('transactionTo') transactionTo: ElementRef;

  userId: any = '';
  values: any[] = [];
  createdDate = '';
  createdBy = '';
  modifiedDate = '';
  modifiedBy = '';

  protected submitted = false;

  constructor(
    router: Router,
    auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {
    super(router, auth);
  }

  ngOnInit(): void {
  }

  deleteTransaction(_id: any) {
    
  }

  checkSelect() {
    
  }

  protected onSubmit(): void {
    this.submitted = true;
   
  }

}
