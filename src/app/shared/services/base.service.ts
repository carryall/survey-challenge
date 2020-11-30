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

  USER_TOKEN_TYPE = 'authorization_type';
  USER_ACCESS_TOKEN = 'authorization_token';

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  post(endpoint: string, body: {}): Observable<any> {
    const apiUrl = this.apiUrlFor(endpoint);

    return this.http.post(apiUrl, body).pipe(
      retry(1),
      catchError(this.handleError));
  }

  protected handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
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
