import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  static themeKey: string = 'theme';
  private theme = new BehaviorSubject<Theme>(Theme.SYSTEM);

  constructor(private settingsService: SettingsService) {
    const savedTheme = this.settingsService.getSettings<ThemeMode>(ThemeService.themeKey);
    if (savedTheme) {
      this.setTheme(savedTheme.mode);
    }
  }

  get currentTheme() {
    return this.theme.value;
  }

  changeTheme(theme: Theme) {
    document.body.classList.remove(Theme.LIGHT, Theme.DARK);

    if (theme === Theme.LIGHT || theme === Theme.DARK) {
      document.body.classList.add(theme === Theme.DARK ? Theme.DARK : Theme.LIGHT);
    }

    this.settingsService.setSettings<ThemeMode>(ThemeService.themeKey, { mode: theme });
    this.setTheme(theme);
  }

  restoreTheme() {
    const theme = this.settingsService.getSettings<ThemeMode>(ThemeService.themeKey);
    if (theme && theme.mode) {
      document.body.classList.remove(Theme.LIGHT, Theme.DARK);

      if (theme.mode !== Theme.SYSTEM) {
        document.body.classList.add(theme.mode === Theme.DARK ? Theme.DARK : Theme.LIGHT);
      }
    }
  }

  private setTheme(theme: Theme) {
    this.theme.next(theme);
  }
}

type ThemeMode = {
  mode: Theme;
}

export enum Theme {
  LIGHT = 'light-mode',
  DARK = 'dark-mode',
  SYSTEM = 'system'
}
