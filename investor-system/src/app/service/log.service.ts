import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Log } from '../model/log';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiURL = '/log';  // URL to web api

  log: Log = {
    _id: new Date(),
    logBy: '',
    logType: '',
    investorName: '',
    investmentNo: undefined,
    description: ''
  }

  constructor(
    private http: HttpClient, 
    private _configService: configService, 
    private toasterService: ToastrService) { 

    }

  logList(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/loglist')
      .pipe(
        map((investor) => investor),
        catchError(this._configService.handleError)
      );
  }

  getLog(id: number | string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiURL + '/getlog/' + id)
      .pipe(
        map((investor) => investor),
        catchError(this._configService.handleError)
      );
  }

  deleteLog(id: number | string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + this.apiURL + '/deletelog/' + id).pipe(
      catchError(this._configService.handleError)
    );
  }

  updateLog(modelData: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + this.apiURL + '/updatelog/', modelData).pipe(
      catchError(this._configService.handleError)
    );
  }

  saveLog(modelData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.apiURL + '/createlog/', modelData).pipe(
      catchError(this._configService.handleError)
    );;
  }
}
