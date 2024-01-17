import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestorComponent } from './manage-investor.component';

describe('ManageInvestorComponent', () => {
  let component: ManageInvestorComponent;
  let fixture: ComponentFixture<ManageInvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInvestorComponent]
    });
    fixture = TestBed.createComponent(ManageInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
