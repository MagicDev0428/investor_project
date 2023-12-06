import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdamFormComponent } from './adam-form.component';

describe('ListInvestorComponent', () => {
  let component: AdamFormComponent;
  let fixture: ComponentFixture<AdamFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdamFormComponent]
    });
    fixture = TestBed.createComponent(AdamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});