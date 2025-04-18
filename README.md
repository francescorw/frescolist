# Frescolist

Transform text into Spotify playlists - Create and edit playlists from text files or AI-generated song lists.

## About

Frescolist is a web application that lets you create and edit Spotify playlists using a simple text format. Whether you have an AI-generated list of songs or a text file with your favorite tracks, Frescolist makes it easy to turn them into Spotify playlists.

### Features

- **Easy Import**: Create playlists from text files using a simple "Artist - Song" format
- **Simple Editing**: Edit existing playlists with a text-based interface
- **Instant Sync**: Changes are immediately synchronized with your Spotify account
- **Privacy First**: Runs entirely in your browser - no data is stored on external servers

### Example Format
```
The Beatles - Hey Jude
Queen - Bohemian Rhapsody
Pink Floyd - Wish You Were Here
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- A Spotify account
- A registered Spotify application (for client ID and redirect URI)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/francescorw/frescolist.git
cd frescolist
```

2. Install dependencies:
```bash
npm install
```

3. Create an `environment.ts` file in `src/environments/` with your Spotify credentials:
```typescript
export const environment = {
  spotifyClientId: 'your-client-id',
  spotifyRedirectUri: 'http://localhost:4200',
  spotifyScopes: ['playlist-modify-public', 'playlist-modify-private', 'user-read-private']
};
```

### Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Technical Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.

### Available Commands

- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Execute unit tests via [Karma](https://karma-runner.github.io)
- `ng e2e` - Execute end-to-end tests
- `ng generate component component-name` - Generate a new component

## Project Status

🚧 **Alpha** - This project is under active development. Features and UI might change.

## Author

Created by [Francesco](https://github.com/francescorw)

## Further Help

For more help with Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
