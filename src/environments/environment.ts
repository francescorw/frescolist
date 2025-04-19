import { isDevMode } from '@angular/core';
import { environment as devEnvironment } from './environment.development';
import { environment as prodEnvironment } from './environment.production';

export const baseEnvironment = {
  spotifyRedirectUri: `${window.location.protocol}//${window.location.host}`,
  spotifyScopes: [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private']
};

export const environment = {
  ...baseEnvironment,
  ...(isDevMode() ? devEnvironment : prodEnvironment)
};
