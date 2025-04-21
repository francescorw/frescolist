import { TestBed } from '@angular/core/testing';

import { LocalStorageSettingsService } from './local-storage-settings.service';

describe('LocalStorageSettingsService', () => {
  let service: LocalStorageSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
