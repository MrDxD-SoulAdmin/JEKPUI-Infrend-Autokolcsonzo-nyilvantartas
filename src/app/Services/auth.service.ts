import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'accessToken';

  constructor(private router: Router) { }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  preventGuestAccess(): boolean {
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    return isLoggedIn;
  }
  setUserid(id: Number) {
    localStorage.setItem('userid', id.toString());
  }

  static getUserid(): string  {
    const temp = localStorage.getItem('userid');
    return temp?temp:'-1';
  }

  removeUserid() {
    localStorage.removeItem('userid');
  }

}