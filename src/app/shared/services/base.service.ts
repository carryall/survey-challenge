import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  DEFAULT_HEADER: object = {
    'Content-Type': 'application/json'
  };

  DEFAULT_AUTH_HEADER = {
    ...this.DEFAULT_HEADER,
    Authorization: `TOKEN_TYPE ACCESS_TOKEN`
    // Authorization: `${user_token_type} ${user_access_token}`
  }

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  get(endpoint: string, params?: {}, headers?: {}, authenitcate?: true): Observable<any> {
    const apiUrl = this.apiUrlFor(endpoint);
    const defaultHeader = authenitcate ? this.DEFAULT_AUTH_HEADER : this.DEFAULT_HEADER;
    const options = {
      params,
      headers: {...defaultHeader, ...headers}
    };

    return this.http.get(apiUrl, options).pipe(catchError(this.handleError));
  }

  post(endpoint: string, body: {}, headers?: {}, authenitcate?: true): Observable<any> {
    const apiUrl = this.apiUrlFor(endpoint);
    const defaultHeader = authenitcate ? this.DEFAULT_AUTH_HEADER : this.DEFAULT_HEADER;
    const options = {
      headers: {...defaultHeader, ...headers}
    };

    return this.http.post(apiUrl, body, options).pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<any> {
    let errorMessage = '';
    console.log('error', error);
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      // error = error.error;
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.message;
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    }

    const httpError = new HttpErrorResponse({
      error: errorMessage,
      status: error.status,
      statusText: ''
    });
    return throwError(httpError);
  }

  protected apiUrlFor(endpoint: string): string {
    return `${environment.apiBaseUrl}/api/${environment.apiVersion}/${endpoint}`;
  }
}
