import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Adam } from '../model/adam';

@Injectable({
	providedIn: 'root'
})
export class AdamService {
	apiURL = '/adam';  // URL to web api

	adam: Adam = {
		_id: '',
		amount: '',
		transactionFrom: '',
		transactionTo: '',
		createdDate: new Date(),
		investments: '',
		investorName: '',
		investmentNo: 0,
		transferFrom: '',
		transferTo: '',
		transactionNo: '',
		description: '',
		attachments: []
	}

	constructor(
		private http: HttpClient,
		private _configService: configService,
		private toasterService: ToastrService
	) { }

	listAdam(): Observable<any> {
		return this.http.get<any>(environment.apiUrl + this.apiURL + '/listadam')
			.pipe(
				map((adam) => adam),
				catchError(this._configService.handleError)
			);
	}

	getAdam(id: number | string): Observable<any> {
		return this.http.get<any>(environment.apiUrl + this.apiURL + '/getadam/' + id)
			.pipe(
				map((adam) => adam),
				catchError(this._configService.handleError)
			);
	}

	getAdamInvestors(): Observable<any> {
		return this.http.get<any>(environment.apiUrl + this.apiURL + '/adaminvestors')
			.pipe(
				map((adam) => adam),
				catchError(this._configService.handleError)
			);
	}

	deleteAdam(id: number | string): Observable<any> {
		return this.http.delete<any>(environment.apiUrl + this.apiURL + '/deleteadam/' + id).pipe(
			catchError(this._configService.handleError)
		);
	}

	updateAdam(modelData:any): Observable<any> {
		return this.http.put<any>(environment.apiUrl + this.apiURL + '/updateadam/', modelData).pipe(
			catchError(this._configService.handleError)
		);
	}

	saveAdam(modelData: any): Observable<any> {
		return this.http.post<any>(environment.apiUrl + this.apiURL + '/createadam/', modelData).pipe(
			catchError(this._configService.handleError)
		);;
	}


}
