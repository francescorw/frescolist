import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'frescolist-playlists-toolbar',
    imports: [RouterLink, MatIcon, MatToolbar, MatToolbarRow],
    templateUrl: './playlists-toolbar.component.html',
    styleUrl: './playlists-toolbar.component.scss'
})
export class PlaylistsToolbarComponent {
}
