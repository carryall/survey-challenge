import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '@service/base.service';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  DEFAULT_PAYLOAD = {
    client_id: environment.apiClientID,
    client_secret: environment.apiClientSecret
  };

  login(email: string, password: string): Observable<any> {
    const data = {
      grant_type: 'password',
      email,
      password,
      ...this.DEFAULT_PAYLOAD
    };

    return this.post('oauth/token', data);
  }

  requestPasswordReset(email: string): Observable<any> {
    const data = {
      user: {
        email
      },
      ...this.DEFAULT_PAYLOAD
    };

    return this.post('passwords', data);
  }
}
