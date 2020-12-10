import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
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

  post(endpoint: string, payload: {}): Observable<any> {
    const apiUrl = this.apiUrlFor(endpoint);

    return this.http.post(apiUrl, payload).pipe(
      catchError(this.handleError),
      map(response => this.deserialize(response)));
  }

  private handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.statusText;

      // TODO: redirect to login page if error status is 401
    }

    const httpError = new HttpErrorResponse({
      error: errorMessage,
      status: error.status
    });

    return throwError(httpError);
  }

  private apiUrlFor(endpoint: string): string {
    return `${environment.apiBaseUrl}/api/${environment.apiVersion}/${endpoint}`;
  }

  private deserialize(data: any): Observable<any> {
    try {
      return this.deserializer.deserialize(data);
    } catch {
      return data;
    }
  }
}
