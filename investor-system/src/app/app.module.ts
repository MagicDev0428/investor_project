import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ManageInvestorComponent } from './manage-investor/manage-investor.component';
import { ListInvestorComponent } from './list-investor/list-investor.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ManageInvestorComponent,
    ListInvestorComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    ProfileComponent,
    CallbackComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-i2zq17ecubzreyxk.us.auth0.com',
      clientId: 'aP2PzJ0D8mtsvscnuX02mEGPosfi832v',
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
        audience: 'http://localhost:3007'
      },
      errorPath: `unauthorized`,
      cacheLocation: 'localstorage',
      httpInterceptor: {
        allowedList: [
          // {
          //   // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
          //   uri: 'https://dev-i2zq17ecubzreyxk.us.auth0.com/api/v2/*',
          //   tokenOptions: {
          //     authorizationParams: {
          //       // The attached token should target this audience
          //       audience: 'https://dev-i2zq17ecubzreyxk.us.auth0.com/api/v2/',
    
          //       // The attached token should have these scopes
          //       scope: 'read:current_user'
          //     }
          //   }
          // }
          {
            uri: 'http://localhost:3007',
            allowAnonymous: true
          },
          'http://localhost:3007/*'
        ]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
