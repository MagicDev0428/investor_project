import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class configService {

  
  constructor(private router: Router, public auth: AuthService, @Inject(DOCUMENT) private doc: Document, private toasterService: ToastrService) {    
    this.handleError = this.handleError.bind(this);
  }

  handleError(error: HttpErrorResponse) {
    //this.router.navigate(['/unauthorized']);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(() => new Error(`An error occurred: ${error.error.error}`));
    } else if(error.status == 403 || error.toString() === 'Error: Unknown or invalid refresh token.') {
      this.toasterService.error("Invalid token, Please login again!!!");
      this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
    } else if(error.status === 500) {
      this.toasterService.error(error?.error?.error);
    } else {
      this.toasterService.error("Something bad happened.");
      this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return throwError(() => new Error(
        `Error Code ${error.status}: ${error.error.error}`));
      
    }


    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}