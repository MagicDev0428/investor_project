import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

const temp = [
  {createdDate: '15 Nov 2023', time: '12:45', type: 'INVESTOR', description: 'added new investment 45,000,000', customer: 'Mark Snowman', investmentNo:'007', createdBy:'Bee'},
  {createdDate: '15 Nov 2023', time: '13:48', type: 'EMAIL', description: 'profit mail from April sent to Gram', customer: 'Peter Gram', investmentNo:'012', createdBy:'Torben'},
  {createdDate: '15 Nov 2023', time: '12:45', type: 'INVESTOR', description: 'added new investment 45,000,000', customer: 'Mark Snowman', investmentNo:'007', createdBy:'Bee'},
  {createdDate: '15 Nov 2023', time: '13:48', type: 'EMAIL', description: 'profit mail from April sent to Gram', customer: 'Peter Gram', investmentNo:'012', createdBy:'Torben'},
]

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['../adam/investorForm.scss', './log-list.component.scss']
})
export class LogListComponent extends BaseComponent {

  items: any = [];
  currentColumn: string = '';
  isDescending: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.items = temp;
  }


  goForm() {
    this.router.navigate(['/log-form']);
  }

  orderTable(column: string) {
    if (this.currentColumn === column) {
      this.isDescending = !this.isDescending;
    } else {
      this.currentColumn = column;
      this.isDescending = false;
    }

    this.items.sort((a, b) => {
      if (column !== 'amount') {
        if (a[column] > b[column]) {
          return this.isDescending ? -1 : 1;
        } else if (a[column] < b[column]) {
          return this.isDescending ? 1 : -1;
        } else {
          return 0;
        }
      } else {
        let a_value = Number(a[column]?.replace(/[^\d.-]/g, ''));
        let b_value = Number(b[column]?.replace(/[^\d.-]/g, ''));
        if (a_value > b_value) {
          return this.isDescending ? -1 : 1;
        } else if (a_value < b_value) {
          return this.isDescending ? 1 : -1;
        } else {
          return 0;
        }
      }
    });
  }
}
