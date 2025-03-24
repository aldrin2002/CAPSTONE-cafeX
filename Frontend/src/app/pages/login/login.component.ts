import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, HttpClientModule]
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  
  isLoading: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  onSubmit(): void {
    if (!this.user.email || !this.user.password) {
      this.alertService.warning('Validation Error', 'Please enter both email and password');
      return;
    }

    this.isLoading = true;
    this.alertService.loading('Logging in...');
    
    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alertService.closeLoading();
        this.alertService.success('Login Successful', 'Welcome back!', 5000);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        this.alertService.closeLoading();
        
        if (error.status === 401) {
          this.alertService.error('Authentication Failed', 'Invalid email or password');
        } else {
          this.alertService.error('Login Error', 'An error occurred. Please try again later.');
        }
        console.error('Login error:', error);
      }
    });
  }
}
