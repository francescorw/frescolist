import { Route, Routes } from '@angular/router';
import { PlaylistsViewComponent } from './playlists/components/playlists-view/playlists-view.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuardService } from './core/services/auth/auth-guard.service';
import { LoginComponent } from './core/components/login/login.component';
import { PlaylistDetailComponent } from './playlists/components/playlist-detail/playlist-detail.component';
import { InfoComponent } from './core/components/info/info.component';

export const routes: Routes = [
  ...getPlayListsRoutes(),
  ...[
    { ...getProtectedRoute(), path: 'settings', component: SettingsComponent },
    { ...getProtectedRoute(), path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'info', component: InfoComponent },
    { path: '', component: LoginComponent },
    { path: '**', component: NotFoundComponent }
  ]];

function getPlayListsRoutes(): Route[] {
  const root = 'playlists';

  return [
    { ...getProtectedRoute(), path: `${root}/new`, component: PlaylistDetailComponent },
    { ...getProtectedRoute(), path: `${root}/:playlistId`, component: PlaylistDetailComponent },
    { ...getProtectedRoute(), path: root, component: PlaylistsViewComponent },
  ];
}

function getProtectedRoute(): Route {
  return {
    canActivate: [AuthGuardService]
  }
}
