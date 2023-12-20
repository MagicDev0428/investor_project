import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public auth: AuthService) {
    
  }

  toggleNavbar() {
    //$(".navbar-toggler").trigger("click");
  }

  
}
