import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '@service/base.service';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  login(email: string, password: string): Observable<any> {
    const data = {
      grant_type: 'password',
      email,
      password,
      client_id: environment.apiClientID,
      client_secret: environment.apiClientSecret
    };

    return this.post('oauth/token', data);
  }
}
