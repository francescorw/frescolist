export const environment = {
  production: false,
  spotifyClientId: 'f7f0b8b68a27430eb2e486dec14a62f7',
  spotifyRedirectUri: `${window.location.protocol}//${window.location.host}`,
  spotifyScopes: [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private']
};
