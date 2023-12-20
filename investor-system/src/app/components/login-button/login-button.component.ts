import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as $ from 'jquery';
@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styles: []
})
export class LoginButtonComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  loginWithRedirect(): void {
    if($(".navbar-toggler").is(":visible")) {
      $(".navbar-toggler").trigger("click");
    }
    this.auth.loginWithRedirect();
  }
}
