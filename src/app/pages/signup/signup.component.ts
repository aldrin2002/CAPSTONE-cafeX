import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, HttpClientModule]
})
export class SignupComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
    phone: ''
  };
  
  isLoading: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  onSubmit(): void {
    // Validate form
    if (!this.user.fullName || !this.user.email || !this.user.password) {
      this.alertService.warning('Validation Error', 'Please fill in all required fields');
      return;
    }
    
    this.isLoading = true;
    this.alertService.loading('Creating your account...');
    
    // Convert to the format expected by the API
    const userData = {
      fullname: this.user.fullName,
      email: this.user.email,
      password: this.user.password,
      phone: this.user.phone
    };
    
    this.authService.signup(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alertService.closeLoading();
        this.alertService.success('Registration Successful', 'Your account has been created successfully!');
        // Navigate to login page after successful signup
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.alertService.closeLoading();
        
        if (error.status === 400 && error.error && error.error.message) {
          this.alertService.error('Registration Failed', error.error.message);
        } else {
          this.alertService.error('Registration Error', 'An error occurred. Please try again later.');
        }
        console.error('Signup error:', error);
      }
    });
  }
}
