import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';






import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ManageInvestorComponent } from './investor/manage-investor/manage-investor.component';
import { ListInvestorComponent } from './investor/list-investor/list-investor.component';
import { AdamTableComponent } from './adam/adam-table/adam-table.component';
import { AdamFormComponent } from './adam/adam-form/adam-form.component';
import { InvestorInfoComponent } from './investor/info/investor-info.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { InvestmentListComponent } from './investment/investment-list/investment-list.component';
import { InvestmentFormComponent } from './investment/investment-form/investment-form.component';
import { InvestmentInfoComponent } from './investment/investment-info/investment-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CallbackComponent } from './components/callback/callback.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { DndDirective } from './dnd.directive';
import { ProfitButtonComponent } from './components/profit-button/profit-button-component';
import { AuthGuardFN } from './auth-guard.service';
import { InvestorPortfolioComponent } from './investor-portfolio/customer-page/investor-portfolio.component';
import { MyInvestmentFormComponent } from './my-investment/my-investment-form.component';
import { LogListComponent } from './log/log-list/log-list.component';
import { LogFormComponent } from './log/log-form/log-form.component';
import { TotalComponent } from './total/total.component';
import { PortfolioComponent } from './investor-portfolio/portfolio/portfolio.component';
import { PayProfitEnvComponent } from './balance/deposit/pay-profit-env.component';
import { BalanceComponent } from './balance/dialogs/balance/balance.component';
import { HiddenTextComponent } from './balance/dialogs/hidden-text/hidden-text.component';
import { CopyPasteAreaComponent } from './balance/dialogs/copy-paste/copy-paste-area.component';
import { BalanceLogComponent } from './balance/dialogs/balance-log/balance-log.component';
import { PayProfitBankComponent } from './balance/deposit/pay-profit-bank.component';
import { AddMoneyEnvComponent } from './balance/add-money/add-money-env.component';
import { AddMoneyBankComponent } from './balance/add-money/add-money-bank.component';
import { WithdrawCryptoComponent } from './balance/withdraw/withdraw-crypto.component';
import { WithdrawCashComponent } from './balance/withdraw/withdraw-cash.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { MonthSelectorComponent } from './components/month-selector/month-selector.component';
import { DraggableDialogComponent } from './components/draggable-dialog/draggable-dialog.component';
import { BalanceInvestorComponent } from './balance/dialogs/investor-info/investor-info.component';
import { NgbdDatepickerAdapter } from './components/date-picker/datepicker-adapter';
import { LogInComponent } from './login/log-in.component';
import { LoginPincodeButtonComponent } from './components/login-pincode-button/login-pincode-button.component';

//Directives
import { CurrencyDirective } from './directives/currency_directive/currency-directive.directive';
import { PercentDirective } from './directives/percent_directive/percent-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ManageInvestorComponent,
    ListInvestorComponent,
    AdamTableComponent,
    AdamFormComponent,
    InvestorInfoComponent,
    FrontPageComponent,
    InvestmentListComponent,
    InvestmentFormComponent,
    InvestmentInfoComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    ProfileComponent,
    CallbackComponent,
    UnauthorizedComponent,
    DndDirective,
    ProfitButtonComponent,
    InvestorPortfolioComponent,
    MyInvestmentFormComponent,
    LogListComponent,
    LogFormComponent,
    TotalComponent,
    PortfolioComponent,
    PayProfitEnvComponent,
    BalanceComponent,
    HiddenTextComponent,
    CopyPasteAreaComponent,
    BalanceLogComponent,
    PayProfitBankComponent,
    AddMoneyEnvComponent,
    AddMoneyBankComponent,
    WithdrawCryptoComponent,
    WithdrawCashComponent,
    SpinnerComponent,
    DateTimePickerComponent,
    MonthSelectorComponent,
    DraggableDialogComponent,
    BalanceInvestorComponent,
    NgbdDatepickerAdapter,
    LogInComponent,
    LoginPincodeButtonComponent,
    CurrencyDirective,
    PercentDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
        AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
        audience: environment.apiUrl,
        // Request this scope at user authentication time
        scope: 'read:current_user',
      },
      useRefreshTokens: true,
      errorPath: `unauthorized`,
      cacheLocation: 'localstorage',
      httpInterceptor: {
        allowedList: [
          {
            uri: environment.apiUrl,
            allowAnonymous: true,
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: environment.auth0Domain + '/api/v2/',
    
                // The attached token should have these scopes
                scope: 'read:current_user'
              }
            }
          },
          `${environment.apiUrl}/*`
        ],
      }
    }),
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }, {provide: AuthGuardFN },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
