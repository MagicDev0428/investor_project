import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BaseComponent } from '../../../base/base.component';
import { AuthService } from '@auth0/auth0-angular';
import { InvestorService } from '../../../service/investor.service';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['../../../adam/investorForm.scss', './hidden-text.component.scss'],
})

export class HiddenTextComponent extends BaseComponent implements OnInit {
  @Output() isShown = new EventEmitter<boolean>();
  @Input() params: any = {};

  userId: any = '';
  createdDate = '';
  createdBy = '';
  modifiedDate = '';
  modifiedBy = '';
  formData = {
    _id: '',
    hiddenRemark: ''
  }

  protected submitted = false;

  constructor(
    router: Router,
    auth: AuthService,
    toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private investorService: InvestorService,
  ) {
    super(router, auth, toastrService);
  }

  ngOnInit(): void {
    this.userId = this.params?.params?.userId;
    if (typeof this.userId !== 'undefined') {
      this.investorService.getHidden(this.userId).subscribe({
        next: (res) => {
          this.formData = res.investorHiddenRemarks;
        },
        error: err => {
          this.toastrService.error(err);
        },
        complete: () => console.log('There are no more action happen.')
      });
    }
  }

  getHiddenValue(event: any) {
    this.formData.hiddenRemark = event.target.value;
  }

  onClose() {
    this.isShown.emit(true);
  }

  protected onSubmit(): void {
    this.submitted = true;
    this.investorService.saveHidden(this.formData).subscribe({
      next: (res) => {
        this.toastrService.success(`HiddenRemark Data was successfully saved!`);
        this.isShown.emit(true);
      },
      complete: () => console.log('There are no more action happen.')
    });
  }

}
