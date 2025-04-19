import { Injectable } from '@angular/core';
import { SpotifyApi, AuthorizationCodeWithPKCEStrategy } from '@spotify/web-api-ts-sdk';
import { SpotifyService } from '../spotify/spotify.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly implicitGrantStrategy = new AuthorizationCodeWithPKCEStrategy(
    environment.spotifyClientId,
    environment.spotifyRedirectUri,
    environment.spotifyScopes
  );

  constructor(private spotifyService: SpotifyService, router: Router) {

    // Check for access_denied error in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'access_denied') {
      localStorage.removeItem('spotify-sdk:verifier');
      localStorage.removeItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
      router.navigate(['/login']);
      return;
    }

    if (localStorage.getItem('spotify-sdk:verifier') || localStorage.getItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token')) {
      const spotify = new SpotifyApi(this.implicitGrantStrategy);
      spotify.currentUser.profile().then(profile => this.spotifyService.refreshUserProfile(profile));

      this.spotifyService.spotifyApi = spotify;
    }
  }

  get isLoggedIn(): boolean {
    return this.spotifyService.spotifyApi != null;
  }

  async login(): Promise<void> {
    const spotify = new SpotifyApi(this.implicitGrantStrategy);
    const userProfile = await spotify.currentUser.profile();
    this.spotifyService.spotifyApi = spotify;
    this.spotifyService.refreshUserProfile(userProfile);
  }

  logout(): void {
    if (this.spotifyService.spotifyApi === null) {
      return;
    }

    // Clear localStorage
    localStorage.removeItem('spotify-sdk:verifier');
    localStorage.removeItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');

    // Clear Spotify service data
    this.spotifyService.spotifyApi.logOut();
    this.spotifyService.cleanData();
  }
}
