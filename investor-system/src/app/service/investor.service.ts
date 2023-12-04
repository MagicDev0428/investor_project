import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Investor } from '../model/investor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  apiURL = 'api/investors';  // URL to web api

  investor: Investor = {
    id: 0,
    investorName: '',
    nickName: '',
    phone: '',
    email: '',
    address: '',
    zipCode: 0,
    city: '',
    country: '',
    investorStatus: '',
    facebook: '',
    passport: '',
    beneficiaryName: '',
    beneficiaryEmail: '',
    beneficiaryPhone: '',
    countryToTransfer: '',
    currency: '',
    reason: '',
    passportImage: undefined,
    pincode: 0,
    isAdmin: undefined
  }
  constructor(private http: HttpClient, private _configService: configService) { }

  getInvestors(): Observable<Investor[]> {
    return this.http.get<Investor[]>(this.apiURL)
      .pipe(
        map((investor) => investor),
        //tap(investors => this.log(`fetched heroes`)),
        catchError(this._configService.handleError)
      );
  }
  getInvestor(id: number | string): Observable<Investor> {
    return this.getInvestors().pipe(
      map((investors: Investor[]) => investors.find(investor => investor.id == id))
    )

  }

  getMockdata() {
    return of(this.investor);
  }

  uploadFile(fileData: File[]) {

    let formData = new FormData();
    [...fileData].forEach((file) => {
      formData.append("file", file, file.name);
    });
    return formData;
  }

  saveInvestor(modelData: Investor): Observable<Investor> {
    let urlPath = 'investor/addInvestor';


    return this.http.post<Investor>(environment.apiUrl + urlPath, modelData).pipe(
      catchError(this._configService.handleError)
    );;
  }
}
