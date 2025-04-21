import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Theme, ThemeService } from '../../services/theming/theme.service';

@Component({
  selector: 'frescolist-settings',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatRadioModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  selectedTheme: Theme = Theme.SYSTEM;
  readonly themes: { value: Theme, label: string }[] = [
    { value: Theme.SYSTEM, label: 'System default' },
    { value: Theme.LIGHT, label: 'Light' },
    { value: Theme.DARK, label: 'Dark' }
  ];

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {
    console.log("current theme ", this.themeService.currentTheme);
    this.selectedTheme = this.themeService.currentTheme;
  }

  onThemeChange(changeEvent: MatRadioChange): void {
    this.themeService.changeTheme(changeEvent.value);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
