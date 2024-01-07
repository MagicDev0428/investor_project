import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Investor } from '../model/investor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  apiURL = '/balances';  // URL to web api

  constructor(
    private http: HttpClient,
    private _configService: configService,
    private toasterService: ToastrService) {

  }

  getInvestorBalance(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/investorbalancelist/' + id)
      .pipe(
        catchError(this._configService.handleError)
      );
  }
}
