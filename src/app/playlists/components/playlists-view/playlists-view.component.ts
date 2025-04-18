import { Component, OnInit } from '@angular/core';
import { PlaylistsToolbarComponent } from '../playlists-toolbar/playlists-toolbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { Page as FrescoPage } from '../../../core/services/paging';
import { PlaylistItemsListComponent } from '../playlist-items-list/playlist-items-list.component';
import { PlaylistsPage, PlaylistsService } from '../../services/playlists/playlists.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'frescolist-playlists-view',
  imports: [MatDividerModule, PlaylistsToolbarComponent, PlaylistItemsListComponent],
  templateUrl: './playlists-view.component.html',
  styleUrl: './playlists-view.component.scss'
})
export class PlaylistsViewComponent implements OnInit {
  #playlistItems$ = new BehaviorSubject<PlaylistsPage | null>(null);
  get playlistItems$() {
    return this.#playlistItems$;
  }

  constructor(private playlistService: PlaylistsService) { }

  ngOnInit(): void {
    this.playlistPageNeeded({
      pageIndex: 0,
      pageSize: 10
    })
  }

  playlistPageNeeded(event: FrescoPage) {
    this.playlistService.getAll(event)?.subscribe(page => this.#playlistItems$.next(page));
  }
}
