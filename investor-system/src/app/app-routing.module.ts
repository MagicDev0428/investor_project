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
import { AddMoneyBankComponent } from './deposit/add-money-bank.component';
import { WithdrawCryptoComponent } from './deposit/withdraw-crypto.component';
import { WithdrawCashComponent } from './deposit/withdraw-cash.component';
//import { AuthGuard } from '@auth0/auth0-angular';


const routes: Routes = [
  {path: 'list', component: ListInvestorComponent, canActivate: [AuthGuardFN]},
  {path: 'manage-investor', component: ManageInvestorComponent, canActivate: [AuthGuardFN]},
  {path: 'manage-investor/:id', component: ManageInvestorComponent, canActivate: [AuthGuardFN]},
  {path: '', redirectTo: '/my-investments', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthGuardFN]},
  {path: 'adam-table', component: AdamTableComponent, canActivate: [AuthGuardFN]},
  {path: 'adam-form',  component: AdamFormComponent, canActivate: [AuthGuardFN]},
  {path: 'adam-form/:id', component: AdamFormComponent, canActivate: [AuthGuardFN]},
  {path: 'info/:id', component: InvestorInfoComponent, canActivate: [AuthGuardFN]},
  {path: 'front-page', component:FrontPageComponent, canActivate: [AuthGuardFN]},
  {path: 'investment-list', component:InvestmentListComponent, canActivate: [AuthGuardFN]},
  {path: 'investment-form', component:InvestmentFormComponent, canActivate: [AuthGuardFN]},
  {path: 'investment-form/:id', component:InvestmentFormComponent, canActivate: [AuthGuardFN]},
  {path: 'investment-info', component:InvestmentInfoComponent, canActivate: [AuthGuardFN]},
  {path: 'investment-info/:id', component:InvestmentInfoComponent, canActivate: [AuthGuardFN]},
  {path: 'my-investments', component: InvestorPortfolioComponent},
  {path: 'my-investments/:id', component: InvestorPortfolioComponent, canActivate: [AuthGuardFN]},
  {path: 'my-investment-form/:id/:name', component: MyInvestmentFormComponent, canActivate: [AuthGuardFN]},
  {path: 'log-list', component: LogListComponent, canActivate: [AuthGuardFN]},
  {path: 'log-form', component: LogFormComponent, canActivate: [AuthGuardFN]},
  {path: 'log-form/:id', component: LogFormComponent, canActivate: [AuthGuardFN]},
  {path: 'total', component: TotalComponent, canActivate: [AuthGuardFN]},
  {path: 'portfolio/:id', component: PortfolioComponent, canActivate: [AuthGuardFN]},
  {path: 'pay-profit-env/:id/:name', component: PayProfitEnvComponent, canActivate: [AuthGuardFN]},
  {path: 'balance', component: BalanceComponent, canActivate: [AuthGuardFN]},
  {path: 'hidden-text', component: HiddenTextComponent, canActivate: [AuthGuardFN]},
  {path: 'copy-paste', component: CopyPasteAreaComponent, canActivate: [AuthGuardFN]},
  {path: 'balance-log', component: BalanceLogComponent, canActivate: [AuthGuardFN]},
  {path: 'pay-profit-bank/:id/:name', component: PayProfitBankComponent, canActivate: [AuthGuardFN]},
  {path: 'add-money-env/:id/:name', component: AddMoneyEnvComponent, canActivate: [AuthGuardFN]},
  {path: 'add-money-bank/:id/:name', component: AddMoneyBankComponent, canActivate: [AuthGuardFN]},
  {path: 'withdraw-crypto/:id/:name', component: WithdrawCryptoComponent, canActivate: [AuthGuardFN]},
  {path: 'withdraw-cash/:id/:name', component: WithdrawCashComponent, canActivate: [AuthGuardFN]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
