import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoComponent } from '../logo/logo/logo.component';

@Component({
  selector: 'frescolist-toolbar',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LogoComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() appName: string = '';

  constructor(private authService: AuthService) { }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn;
  }
}
