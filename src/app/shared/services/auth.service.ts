import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_ACCESS_TOKEN = 'user_access_token';
  USER_TOKEN_TYPE = 'user_token_type';

  constructor(private router: Router) { }

  setAccessToken(accessToken: string, tokenType: string): void {
    localStorage.setItem(this.USER_ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.USER_TOKEN_TYPE, tokenType);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.USER_ACCESS_TOKEN) != null && localStorage.getItem(this.USER_TOKEN_TYPE) != null;
  }
}
