export const environment = {
  production: true,
  spotifyClientId: '9c42d0e23d09489fb51395ff9b143306',
  spotifyRedirectUri: `${window.location.protocol}//${window.location.host}`,
  spotifyScopes: [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private']
};
