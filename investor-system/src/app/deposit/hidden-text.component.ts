import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['../adam/investorForm.scss', './hidden-text.component.scss'],
})

export class HiddenTextComponent extends BaseComponent implements OnInit {
  @Output() isShown = new EventEmitter<boolean>();

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
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit(): void {
  }

  deleteTransaction(_id: any) {
    
  }

  checkSelect() {
    
  }

  onClose() {
    this.isShown.emit(true);
  }

  protected onSubmit(): void {
    this.submitted = true;
   
  }

}
