import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdamTableComponent } from './adam-table.component';

describe('ListInvestorComponent', () => {
  let component: AdamTableComponent;
  let fixture: ComponentFixture<AdamTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdamTableComponent]
    });
    fixture = TestBed.createComponent(AdamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});