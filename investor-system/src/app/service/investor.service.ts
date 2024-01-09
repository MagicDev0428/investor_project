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
export class InvestorService {
  apiURL = '/investor';  // URL to web api

  investor: Investor = {
    _id: undefined,
    name: '',
    nickname: '',
    phone: '',
    email: '',
    address: '',
    postcode: 0,
    city: '',
    country: '',
    status: '',
    facebook: '',
    passport: '',
    beneficiaryName: '',
    beneficiaryEmail: '',
    beneficiaryPhone: '',
    countryToTransfer: '',
    currency: '',
    reason: '',
    passportImages: undefined,
    pincode: 0,
    isAdmin: undefined,
    transferType: '',
    transferInfo: '',
    investorFolderId: '',
    lastLogin: undefined
  }

  constructor(
    private http: HttpClient,
    private _configService: configService,
    private toasterService: ToastrService) {

  }

  getInvestors(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/investorlist')
      .pipe(
        map((investor) => investor),
        catchError(this._configService.handleError)
      );
  }

  getInvestor(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/getinvestor/' + id)
      .pipe(
        map((investor) => investor),
        catchError(this._configService.handleError)
      );
  }

  deleteInvestor(id: number | string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + this.apiURL + '/deleteinvestor/' + id).pipe(
      catchError(this._configService.handleError)
    );
  }

  getMockdata() {
    return of(this.investor);
  }

  uploadFile(fileData: File[]) {

    let formData = new FormData();
    [...fileData].forEach((file) => {
      formData.append("passportImages", file, file.name);
    });
    return formData;
  }

  updateInvestor(modelData: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + this.apiURL + '/updateinvestor/', modelData).pipe(
      catchError(this._configService.handleError)
    );
  }

  saveInvestor(modelData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.apiURL + '/createinvestor/', modelData).pipe(
      catchError(this._configService.handleError)
    );
  }

  getInvestorInfo(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/investorinfobyid/' + id)
      .pipe(
        catchError(this._configService.handleError)
      );
  }

  getFrontPage(date: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.apiURL + '/investorlistbydate/', date).pipe(
      catchError(this._configService.handleError)
    );
  }

  getCopyPaste(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/investorcopypaste/' + id)
      .pipe(
        catchError(this._configService.handleError)
      );
  }

  saveCopyPaste(modelData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.apiURL + '/investorcopypaste/', modelData).pipe(
      catchError(this._configService.handleError)
    );
  }

  getHidden(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/investorhiddenremarks/' + id)
      .pipe(
        catchError(this._configService.handleError)
      );
  }

  saveHidden(modelData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.apiURL + '/investorhiddenremarks/', modelData).pipe(
      catchError(this._configService.handleError)
    );
  }

  getInvestorBalance(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/balancewithmyinvestment/' + id)
      .pipe(
        catchError(this._configService.handleError)
      );
  }

  getInvestorPortfolio(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/investorportfolio/' + id)
      .pipe(
        catchError(this._configService.handleError)
      );
  }
}
