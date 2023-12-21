import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['../adam/investorForm.scss','./log-form.component.scss']
})
export class LogFormComponent extends BaseComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  goTable() {
    this.router.navigate(['/log-list/']);
  }
}
