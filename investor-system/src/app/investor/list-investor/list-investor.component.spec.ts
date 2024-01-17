import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvestorComponent } from './list-investor.component';

describe('ListInvestorComponent', () => {
  let component: ListInvestorComponent;
  let fixture: ComponentFixture<ListInvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInvestorComponent]
    });
    fixture = TestBed.createComponent(ListInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
