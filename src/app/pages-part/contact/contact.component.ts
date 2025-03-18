import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigateHome() {
    console.log('Navigating to home from Contact...');
    this.router.navigate(['/home']);
  }
}
