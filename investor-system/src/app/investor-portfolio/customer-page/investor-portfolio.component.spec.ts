import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorPortfolioComponent } from './investor-portfolio.component';

describe('InvestorPortfolioComponent', () => {
  let component: InvestorPortfolioComponent;
  let fixture: ComponentFixture<InvestorPortfolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorPortfolioComponent]
    });
    fixture = TestBed.createComponent(InvestorPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
