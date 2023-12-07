import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configService } from '../service/config.service';
import { environment } from '../../environments/environment';

interface Message {
  message?: string;
  err?: boolean;
  error?: string;
}

@Component({
  selector: 'app-list-investor',
  templateUrl: './list-investor.component.html',
  styleUrls: ['../adam/investorForm.scss', './list-investor.component.scss']
})
export class ListInvestorComponent {
  message: string | undefined;

  constructor(private http: HttpClient, private configService: configService) {}

  callProtectedEndpoint(): void {
    this.http
      .get<Message>(`${environment.apiUrl}/private`)
      .subscribe({
        next: result => {
          if (result.err) {
            this.message = result.error as string;
          } else {
            this.message = result.message as string;
          }
        },
        error: error => {
          console.log({error})
          this.message = error.error
        }
      });
  }

  callPublicEndpoint(): void {
    this.http
      .get<Message>(`${environment.apiUrl}`)
      .subscribe(result => {
        this.message = result.message;
      });

  }
}
