import { Injectable } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify/spotify.service';
import { from, map, Observable, switchMap } from 'rxjs';
import { Page as FrescoPage, FilledPage } from '../../../core/services/paging';
import { MaxInt, Page, SimplifiedPlaylist, SpotifyApi, UserProfile } from '@spotify/web-api-ts-sdk';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  constructor(private spotifyService: SpotifyService) { }

  getAll(pageInfo: FrescoPage): Observable<PlaylistsPage> | undefined {
    const playlists = this.spotifyService.spotifyApi?.currentUser.playlists.playlists(pageInfo.pageSize, pageInfo.pageIndex * pageInfo.pageSize);

    if (playlists === undefined) {
      return undefined;
    }

    return from(playlists as Promise<Page<SimplifiedPlaylist>>).pipe(
      map((p: Page<SimplifiedPlaylist>) => ({
        currentPageItems: p.items.map(item => ({
          id: item.id,
          title: item.name,
          iconSrc: item.images[0]?.url
        })),
        totalItems: p.total,
        pageSize: p.items.length as MaxInt<50>,
        pageIndex: Math.floor(p.items.length / p.total) as MaxInt<50>
      }))
    );
  }

  getPlaylistDetails(playlistId: string): Observable<{ id: string; title: string; content: string }> {
    if (this.spotifyService.spotifyApi === null) {
      throw new Error('No Spotify API instance available');
    }

    const api = this.spotifyService.spotifyApi;

    return from(api.playlists.getPlaylist(playlistId)).pipe(
      map(({ id, name, tracks }) => {
        const content = tracks.items
          .map(item => {
            const track = item.track;
            const artistNames = track.artists.map(artist => artist.name).join(', ');
            return `${artistNames} - ${track.name}`;
          })
          .join('\n');

        return {
          id: id,
          title: name,
          content
        };
      })
    );
  }

  add(createModel: CreatePlaylistModel): Observable<PersistedPlaylistModel> {
    if (this.spotifyService.spotifyApi === null) {
      throw new Error('No spotify api instance available');
    }

    return from(
      createPlaylistFromText(
        this.spotifyService.spotifyApi!,
        this.spotifyService.userProfile!,
        createModel.title,
        createModel.content
      )
    ).pipe(
      map(createdPlaylist => ({
        id: createdPlaylist.playlist.id,
        title: createdPlaylist.playlist.name
      }))
    );
  }

  edit(editModel: EditPlaylistModel): Observable<PersistedPlaylistModel> {
    if (this.spotifyService.spotifyApi === null) {
      throw new Error('No spotify api instance available');
    }

    return from(
      editPlaylistFromText(
        this.spotifyService.spotifyApi!,
        editModel.playlistId,
        editModel.content
      )
    ).pipe(
      map(({ playlist }) => ({
        id: playlist.id,
        title: playlist.name
      }))
    );
  }
}

export type PersistedPlaylistModel = {
  id: string;
  title: string;
  iconSrc?: string;
}

export type PlaylistsPage = FilledPage<PersistedPlaylistModel>;

export type CreatePlaylistModel = {
  title: string;
  content: string;
}

export type CreatePlaylistFromTextResult = {
  playlist: SimplifiedPlaylist;
  noMatches: string[];
}

export type EditPlaylistModel = {
  playlistId: string;
  content: string;
}

async function createPlaylistFromText(api: SpotifyApi, currentUserProfile: UserProfile, title: string, content: string): Promise<CreatePlaylistFromTextResult> {
  const candidateSongs = content.
    toString().
    split('\n').
    filter(line => line && line.trim());

  const searchResults = await Promise.all(
    candidateSongs.
      map(async songQuery => {
        const result = await api.search(songQuery, ['track']);
        return {
          query: songQuery,
          result: result
        }
      })
  );

  const groups = searchResults.reduce((resultsByMatches, r) => {
    if (r.result.tracks.items.length > 0) {
      resultsByMatches.withMatches.push(`spotify:track:${r.result.tracks.items[0].id}`);
    } else {
      resultsByMatches.noMatches.push(r.query);
    }

    return resultsByMatches;
  }, {
    noMatches: Array<string>(),
    withMatches: Array<string>()
  });

  const createdPlaylist = await api.playlists.createPlaylist(currentUserProfile.id, {
    name: title
  });

  await api.playlists.addItemsToPlaylist(createdPlaylist.id, groups.withMatches);

  return {
    playlist: createdPlaylist,
    noMatches: groups.noMatches
  };
}

async function editPlaylistFromText(api: SpotifyApi, playlistId: string, content: string): Promise<CreatePlaylistFromTextResult> {
  // Step 1: Parse the input content to extract song queries
  const candidateSongs = content
    .toString()
    .split('\n')
    .filter(line => line && line.trim());

  // Step 2: Search for each song query
  const searchResults = await Promise.all(
    candidateSongs.map(async songQuery => {
      const result = await api.search(songQuery, ['track']);
      return {
        query: songQuery,
        result: result
      };
    })
  );

  // Step 3: Group search results into matches and no matches
  const groups = searchResults.reduce(
    (resultsByMatches, r) => {
      if (r.result.tracks.items.length > 0) {
        resultsByMatches.withMatches.push(`spotify:track:${r.result.tracks.items[0].id}`);
      } else {
        resultsByMatches.noMatches.push(r.query);
      }
      return resultsByMatches;
    },
    {
      noMatches: Array<string>(),
      withMatches: Array<string>()
    }
  );

  // Step 4: Remove all existing items from the playlist
  const playlistTracks = await api.playlists.getPlaylistItems(playlistId);
  const urisToRemove = playlistTracks.items.map(item => item.track.uri);

  if (urisToRemove.length > 0) {
    await api.playlists.removeItemsFromPlaylist(
      playlistId, {
      tracks: urisToRemove.map(uri => ({ uri }))
    }
    );
  }

  // Step 5: Add the matched tracks to the playlist
  if (groups.withMatches.length > 0) {
    await api.playlists.addItemsToPlaylist(playlistId, groups.withMatches);
  }

  // Step 6: Return the playlist and unmatched queries
  return {
    playlist: await api.playlists.getPlaylist(playlistId),
    noMatches: groups.noMatches
  };
}
