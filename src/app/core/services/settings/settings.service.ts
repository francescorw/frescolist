import { Injectable } from '@angular/core';

@Injectable()
export abstract class SettingsService {
  abstract getSettings<T>(key: string): T | null;
  abstract setSettings<T>(key: string, value: T): void;
}
