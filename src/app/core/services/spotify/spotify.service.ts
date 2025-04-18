import { Injectable } from '@angular/core';
import { SpotifyApi, UserProfile } from '@spotify/web-api-ts-sdk';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  #spotifyApi: SpotifyApi | null = null;
  #userProfileCached?: UserProfile;

  set spotifyApi(value: SpotifyApi | null) {
    this.#spotifyApi = value;
  }

  get spotifyApi() {
    return this.#spotifyApi;
  }

  get userProfile() {
    return this.#userProfileCached;
  }

  constructor() { }

  refreshUserProfile(userProfile: UserProfile): void {
    this.#userProfileCached = userProfile;
  }

  cleanData(): void {
    this.#spotifyApi = null;
    this.#userProfileCached = undefined;
  }
}
