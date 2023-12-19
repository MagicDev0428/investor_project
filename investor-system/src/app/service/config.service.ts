import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class configService {


  constructor() {
    // this.toastrService = this.toastrService.bind(this);
    console.log(this);

  }

  handleError(error: HttpErrorResponse) {
    console.log(this);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(() => new Error(`An error occurred: ${error.error.error}`));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return throwError(() => new Error(
        `Error Code ${error.status}: ${error.error.error}`));
    }


    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}