import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable()
export class LocalStorageSettingsService extends SettingsService {
  constructor() {
    super();
  }

  override getSettings<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (e) {
        console.error(`Error parsing value from localStorage for key "${key}":`, e);
        return null;
      }
    }
    return null;
  }
  override setSettings<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting value in localStorage for key "${key}":`, e);
    }
  }
}
