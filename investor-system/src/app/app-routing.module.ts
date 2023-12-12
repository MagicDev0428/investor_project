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
import { InvestorSystemComponent } from './investor-system/investor-system.component';
// import {  AuthService } from '@auth0/auth0-angular';
// import { authService } from './service/auth.service';
import { AuthGuardFN } from './auth-guard.service';
//import { AuthGuard } from '@auth0/auth0-angular';


const routes: Routes = [
  {path: 'list', component: ListInvestorComponent},
  {path: 'manage-investor', component: ManageInvestorComponent, canActivate: [AuthGuardFN]},
  {path: 'manage-investor/:id', component: ManageInvestorComponent, canActivate: [AuthGuardFN]},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent },
  {path: 'callback', component: CallbackComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'adam-table', component: AdamTableComponent, canActivate: [AuthGuardFN]},
  {path: 'adam-form',  component: AdamFormComponent, canActivate: [AuthGuardFN]},
  {path: 'info', component: InvestorInfoComponent, canActivate: [AuthGuardFN]},
  {path: 'investor-system', component:InvestorSystemComponent, canActivate: [AuthGuardFN]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
