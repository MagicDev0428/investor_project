import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ListInvestorComponent } from './list-investor/list-investor.component';
import { ManageInvestorComponent } from './manage-investor/manage-investor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CallbackComponent } from './components/callback/callback.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AdamTableComponent } from './adam/adam-table.component';
import { AdamFormComponent } from './adam/adam-form.component';
import { InvestorInfoComponent } from './info/investor-info.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { InvestmentListComponent } from './investment/investment-list.component';
import { InvestmentFormComponent } from './investment/investment-form.component';
import { InvestmentInfoComponent } from './investment/investment-info.component';
import { MyInvestmentFormComponent } from './my-investment/my-investment-form.component';
import { LogListComponent } from './log/log-list.component';
import { LogFormComponent } from './log/log-form.component';
import { TotalComponent } from './total/total.component';
import { PortfolioComponent } from './investor-portfolio/portfolio.component';
import { PayProfitEnvComponent } from './deposit/pay-profit-env.component';
// import {  AuthService } from '@auth0/auth0-angular';
// import { authService } from './service/auth.service';
import { AuthGuardFN } from './auth-guard.service';
import { InvestorPortfolioComponent } from './investor-portfolio/investor-portfolio.component';
import { BalanceComponent } from './deposit/balance.component';
import { HiddenTextComponent } from './deposit/hidden-text.component';
import { CopyPasteAreaComponent } from './deposit/copy-paste-area.component';
import { BalanceLogComponent } from './deposit/balance-log.component';
import { PayProfitBankComponent } from './deposit/pay-profit-bank.component';
import { AddMoneyEnvComponent } from './deposit/add-money-env.component';
import { WithdrawCryptoComponent } from './deposit/withdraw-crypto.component';
import { WithdrawCashComponent } from './deposit/withdraw-cash.component';
//import { AuthGuard } from '@auth0/auth0-angular';


const routes: Routes = [
  {path: 'list', component: ListInvestorComponent},
  {path: 'manage-investor', component: ManageInvestorComponent},
  {path: 'manage-investor/:id', component: ManageInvestorComponent},
  {path: '', redirectTo: '/my-investments', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent },
  {path: 'callback', component: CallbackComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'adam-table', component: AdamTableComponent},
  {path: 'adam-form',  component: AdamFormComponent},
  {path: 'adam-form/:id', component: AdamFormComponent},
  {path: 'info', component: InvestorInfoComponent},
  {path: 'info/:id', component: InvestorInfoComponent},
  {path: 'front-page', component:FrontPageComponent},
  {path: 'investment-list', component:InvestmentListComponent},
  {path: 'investment-form', component:InvestmentFormComponent},
  {path: 'investment-form/:id', component:InvestmentFormComponent},
  {path: 'investment-info', component:InvestmentInfoComponent},
  {path: 'investment-info/:id', component:InvestmentInfoComponent},
  {path: 'my-investments', component: InvestorPortfolioComponent},
  {path: 'my-investment-form', component: MyInvestmentFormComponent},
  {path: 'my-investment-form/:id', component: MyInvestmentFormComponent},
  {path: 'log-list', component: LogListComponent},
  {path: 'log-form', component: LogFormComponent},
  {path: 'log-form/:id', component: LogFormComponent},
  {path: 'total', component: TotalComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'pay-profit-env', component: PayProfitEnvComponent},
  {path: 'balance', component: BalanceComponent},
  {path: 'hidden-text', component: HiddenTextComponent},
  {path: 'copy-paste', component: CopyPasteAreaComponent},
  {path: 'balance-log', component: BalanceLogComponent},
  {path: 'pay-profit-bank', component: PayProfitBankComponent},
  {path: 'add-money-env', component: AddMoneyEnvComponent},
  {path: 'withdraw-crypto', component: WithdrawCryptoComponent},
  {path: 'withdraw-cash', component: WithdrawCashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
