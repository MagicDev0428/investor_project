import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MyInvestment } from '../model/myInvestment';

@Injectable({
    providedIn: 'root'
})
export class MyInvestmentService {
    apiURL = '/myinvestment';  // URL to web api

    myInvestment: MyInvestment = {
        documents: [],
        investmentNo: 0,
        investorName: '',
        amountInvested: 0,
        transferDate: null,
        transactionFrom: null,
        transactionTo: null,
        transactionNo: null,
        profitMonthlyPct: 0,
        profitMonthly: 0,
        profitAnnualPct: 0,
        profitAnnual: 0,
        profitEndPct: 0,
        profitEnd: 0,
        investType: "Mixed",
        firstProfitDate: null,
        lastProfitDate: null,
        payBackDate: null,
        torbenMonthlyPct: 0,
        torbenMonthly: 0,
        torbenAnnualPct: 0,
        torbenAnnual: 0,
        torbenEndPct: 0,
        torbenEnd: 0,
        description: '',
        createdDate: null,
        createdBy: '',
        modifiedDate: null,
        modifiedBy: '',
        startDate: null
    }

    constructor(
        private http: HttpClient,
        private _configService: configService,
        private toasterService: ToastrService
    ) { }

    myInvestmentList(): Observable<any> {
        return this.http.get<any>(environment.apiUrl + this.apiURL + '/myinvestmentlist')
            .pipe(
                map((investment) => investment),
                catchError(this._configService.handleError)
            );
    }

    getMyInvestment(id: number | string): Observable<any> {
        return this.http.get<any>(environment.apiUrl + this.apiURL + '/getmyinvestment/' + id)
            .pipe(
                map((investment) => investment),
                catchError(this._configService.handleError)
            );
    }

    deleteMyInvestment(id: number | string): Observable<any> {
        return this.http.delete<any>(environment.apiUrl + this.apiURL + '/deletemyinvestment/' + id).pipe(
            catchError(this._configService.handleError)
        );
    }

    updateMyInvestment(modelData: any): Observable<any> {
        return this.http.put<any>(environment.apiUrl + this.apiURL + '/updatemyinvestment/', modelData).pipe(
            catchError(this._configService.handleError)
        );
    }

    createMyInvestment(modelData: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + this.apiURL + '/createmyinvestment/', modelData).pipe(
            catchError(this._configService.handleError)
        );
    }
}
