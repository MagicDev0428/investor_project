import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public auth: AuthService) {
    
  }

  toggleNavbar() {
    if($(".navbar-toggler").is(":visible")) {
      $(".navbar-toggler").trigger("click");
    }
  }

  
}
