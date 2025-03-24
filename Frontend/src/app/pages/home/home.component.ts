import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) {}

  logout(): void {
    this.authService.logout();
    this.alertService.success('Logout Successful', 'You have been logged out successfully!', 5000);
    this.router.navigate(['/login']);
  }
}
