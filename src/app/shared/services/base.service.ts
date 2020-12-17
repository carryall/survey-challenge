import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environment/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Deserializer } from 'ts-jsonapi';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  DEFAULT_HEADER: { [key: string]: string; } = {
    'Content-Type': 'application/json'
  };
  GENERIC_ERROR = 'Something went wrong, please try again later';

  deserializer: Deserializer;

  constructor(private http: HttpClient) {
    this.deserializer = new Deserializer({
      keyForAttribute: 'camelCase'
    });
  }

  post(endpoint: string, payload: {}): Observable<any> {
    const apiUrl = this.apiUrlFor(endpoint);
    const requestOptions = {
      headers: new HttpHeaders(this.DEFAULT_HEADER)
    };

    return this.http.post(apiUrl, payload, requestOptions).pipe(
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
      errorMessage = error.error.errors[0].detail;

      // TODO: redirect to login page if error status is 401
    }

    errorMessage ||=  this.GENERIC_ERROR;

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
