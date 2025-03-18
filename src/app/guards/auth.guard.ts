import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard: Checking authentication status for route:', state.url);
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('AuthGuard: Is authenticated?', isAuthenticated);
    console.log('AuthGuard: Token value:', this.authService.getToken());
    
    if (isAuthenticated) {
      console.log('AuthGuard: Access granted to:', state.url);
      return true;
    } else {
      console.log('AuthGuard: Access denied, redirecting to login');
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
} 