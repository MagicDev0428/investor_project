import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Investment } from '../model/investment';

@Injectable({
    providedIn: 'root'
})
export class InvestmentService {
    apiURL = '/investments';  // URL to web api

    investment: Investment = {
        _id: 0,
        startDate: new Date,
        endDate: new Date,
        investAmount: '',
        investType: '',
        profitMonthly: 0,
        profitYearly: 0,
        profitEnd: 0,
        explanation: '',
        attachments: [],
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

    investmentList(): Observable<any> {
        return this.http.get<any>(environment.apiUrl + this.apiURL + '/investmentlist')
            .pipe(
                map((investment) => investment),
                catchError(this._configService.handleError)
            );
    }

    getInvestment(id: number | string): Observable<any> {
        return this.http.get<any>(environment.apiUrl + this.apiURL + '/getinvestment/' + id)
            .pipe(
                map((investment) => investment),
                catchError(this._configService.handleError)
            );
    }

    deleteInvestment(id: number | string): Observable<any> {
        return this.http.delete<any>(environment.apiUrl + this.apiURL + '/deleteinvestment/' + id).pipe(
            catchError(this._configService.handleError)
        );
    }

    updateInvestment(modelData: any): Observable<any> {
        return this.http.put<any>(environment.apiUrl + this.apiURL + '/updateinvestment/', modelData).pipe(
            catchError(this._configService.handleError)
        );
    }

    createInvestment(modelData: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + this.apiURL + '/createinvestment/', modelData).pipe(
            catchError(this._configService.handleError)
        );
    }

    getInvestmentNo(): Observable<any> {
        return this.http.get<any>(environment.apiUrl + this.apiURL + '/investmentno/');
    }

    getInvestmentInfo(id: number | string): Observable<any> {
        return this.http.get<any>(environment.apiUrl + this.apiURL + '/investmentinfo/' + id)
            .pipe(
                catchError(this._configService.handleError)
            );
    }

    getMyInvestment(id: number | string): Observable<any> {
        return this.http.get<any>(environment.apiUrl + this.apiURL + '/investmentMyInvestments/' + id)
            .pipe(
                catchError(this._configService.handleError)
            );
    }


}
