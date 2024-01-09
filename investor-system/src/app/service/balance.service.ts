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
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/balancewithmyinvestment/' + id)
      .pipe(
        catchError(this._configService.handleError)
      );
  }

  saveBalance(modelData: any): Observable<any> {
		return this.http.post<any>(environment.apiUrl + this.apiURL + '/createbalance/', modelData).pipe(
			catchError(this._configService.handleError)
		);;
	}

  updateBalance(modelData: any): Observable<any> {
		return this.http.put<any>(environment.apiUrl + this.apiURL + '/updatebalance/', modelData).pipe(
			catchError(this._configService.handleError)
		);
	}

  deleteBalance(id: number | string): Observable<any> {
		return this.http.delete<any>(environment.apiUrl + this.apiURL + '/deletebalance/' + id).pipe(
			catchError(this._configService.handleError)
		);
	}

  getBalance(id: number | string): Observable<any> {
		return this.http.get<any>(environment.apiUrl + this.apiURL + '/getbalance/' + id)
			.pipe(
				map((adam) => adam),
				catchError(this._configService.handleError)
			);
	}
}
