import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private requestMap = new Map();

  constructor(
    private loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught', request.url);
    if(!this.requestMap.get(request.url)) {
      this.requestMap.set(request.url, true);
    }
    //this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        
        this.requestMap.delete(request.url);
        console.log("finalize", this.requestMap.size)
        //this.totalRequests--;
        if (this.requestMap.size == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}