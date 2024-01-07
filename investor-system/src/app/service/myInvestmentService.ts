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
        investmentNo: 0,
        investorName: '',
        amountInvested: '',
        transferDate: new Date,
        transactionFrom: '',
        transactionTo: '',
        transactionNo: '',
        documents: [],
        profitMonthly: 0,
        profitYearly: 0,
        profitEnd: 0,
        investType: '',
        firstProfitDate: new Date,
        lastProfitDate: new Date,
        payBackDate: 0,
        torbenMonthly: 0,
        torbenYearly: 0,
        torbenEnd: 0,
        description: '',
        createdDate: new Date,
        createdBy: '',
        modifiedDate: new Date,
        modifiedBy: '',
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
