import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/CafeX/api';
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  constructor(private http: HttpClient) {
    console.log('AuthService: Initializing...');
    this.checkInitialToken();
  }

  private checkInitialToken() {
    const token = this.getToken();
    console.log('AuthService: Initial token check:', token ? 'Token exists' : 'No token');
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup.php`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login.php`, credentials)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            console.log('AuthService: Setting new token');
            this.setToken(response.token);
            this.setUser(response.user);
          }
        })
      );
  }

  logout(): void {
    console.log('AuthService: Logging out, removing token');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const isValid = !!token;
    console.log('AuthService: Token validation result:', isValid);
    return isValid;
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('AuthService: Retrieved token:', token ? 'exists' : 'null');
    return token;
  }

  getUser(): any {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  private setToken(token: string): void {
    console.log('AuthService: Setting token in localStorage');
    localStorage.setItem(this.tokenKey, token);
  }

  private setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
} 