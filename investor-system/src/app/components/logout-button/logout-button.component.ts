import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styles: []
})
export class LogoutButtonComponent implements OnInit{
  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    
  }

  logout(): void {
    if($(".navbar-toggler").is(":visible")) {
      $(".navbar-toggler").trigger("click");
    }
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}
