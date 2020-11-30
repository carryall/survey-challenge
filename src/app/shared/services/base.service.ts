import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Deserializer } from 'ts-jsonapi';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseService {
  DEFAULT_HEADER: object = {
    'Content-Type': 'application/json'
  };

  deserializer: Deserializer;

  constructor(private http: HttpClient) {
    this.deserializer = new Deserializer({
      keyForAttribute: 'camelCase'
    });
  }

  post(endpoint: string, body: {}): Observable<any> {
    const apiUrl = this.apiUrlFor(endpoint);

    return this.http.post(apiUrl, body).pipe(
      retry(1),
      catchError(this.handleError),
      map(response => this.deserialize(response)));
  }

  protected handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.message;

      // TODO: redirect to login page if error status is 401
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

  protected deserialize(data: any): Observable<any> {
    try {
      return this.deserializer.deserialize(data);
    } catch {
      return data;
    }
  }
}
