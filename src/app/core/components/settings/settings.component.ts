import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'frescolist-settings',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
