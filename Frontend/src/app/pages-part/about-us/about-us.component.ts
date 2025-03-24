import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigateHome() {
    console.log('Navigating to home from About Us...');
    this.router.navigate(['/home']);
  }
}
