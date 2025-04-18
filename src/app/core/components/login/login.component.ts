import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'frescolist-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn) {
      this.#goToHome();
    }
  }

  async onLoginButtonClick(): Promise<void> {
    await this.authService.login();
    this.#goToHome();
  }

  #goToHome() {
    this.router.navigate(['/']);
  }
}
