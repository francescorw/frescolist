import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistItemComponent } from '../playlist-item/playlist-item.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Page as FrescoPage } from '../../../core/services/paging';
import { PlaylistsPage } from '../../services/playlists/playlists.service';
import { BehaviorSubject } from 'rxjs';
import { MaxInt } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'frescolist-playlist-items-list',
  imports: [PlaylistItemComponent, MatListModule, MatPaginatorModule],
  templateUrl: './playlist-items-list.component.html',
  styleUrl: './playlist-items-list.component.scss'
})
export class PlaylistItemsListComponent implements OnInit {
  readonly pageSize = MAX_ITEMS_PER_PAGE;
  readonly pageSizeOptions = [MAX_ITEMS_PER_PAGE];
  currentPage?: PlaylistsPage;
  @Input() page: number = 0;

  @Output() pageNeeded = new EventEmitter<FrescoPage>();
  @Input() pages$: BehaviorSubject<PlaylistsPage | null> | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to query params changes
    this.route.queryParams.subscribe(params => {
      const page = parseInt(params['page']) || 1;
      if (page <= 50) {
        this.page = page - 1;
        this.pageNeeded.emit({
          pageIndex: page - 1 as MaxInt<50>,
          pageSize: this.pageSize as MaxInt<50>
        });
      }
    });

    // Subscribe to pages updates
    this.pages$?.subscribe(page => {
      if (page != null) {
        this.currentPage = page;
      }
    });
  }

  pageChangedEvent(event: PageEvent) {
    if (event.pageIndex > 50 || event.pageSize > 50) {
      throw new Error('Page index or page size cannot exceed 50');
    }

    // Update URL with new page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: event.pageIndex + 1 },
      queryParamsHandling: 'merge'
    });
  }

  navigateToPlaylist(playlistId: string, title: string): void {
    this.router.navigate([`/playlists/${playlistId}`]);
  }
}

export const MAX_ITEMS_PER_PAGE = 10;
