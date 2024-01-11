import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-login-pincode-button',
  templateUrl: './login-pincode-button.component.html',
  styles: []
})
export class LoginPincodeButtonComponent implements OnInit {
  constructor(
    public auth: AuthService, 
    public router: Router,
  ) { }

  ngOnInit(): void { }

  loginWithPincode(): void {
    if ($(".navbar-toggler").is(":visible")) {
      $(".navbar-toggler").trigger("click");
    }
    this.router.navigate(['login']);
  }
}
