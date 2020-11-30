import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  USER_ACCESS_TOKEN = 'user_access_token';
  USER_TOKEN_TYPE = 'user_token_type';

  constructor() { }

  setAccessToken(accessToken: string, tokenType: string) {
    localStorage.setItem(this.USER_ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.USER_TOKEN_TYPE, tokenType);
  }
}
