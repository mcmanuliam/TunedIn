import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import {spotifyConfig} from '../../config/providers/spotify';
import type {INewReleasesResponse, IFeaturedPlaylistsResponse, IPlaylistTracksResponse, ISearchResponse} from '../../models/providers/spotify';
import type {SearchFilters} from '../../util/enums/search-filter-types.enum';
import {SpotifyImpl} from '../../util/providers/spotify';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  readonly #spotify = inject(SpotifyImpl);

  readonly #conf = spotifyConfig;

  public getRecentReleases(limit: number = 10): Observable<INewReleasesResponse> {
    return this.#spotify.get<INewReleasesResponse>('/browse/new-releases', {
      country: this.#conf.region,
      limit: limit.toString(),
    });
  }

  public getFeaturedPlaylists(limit: number = 10): Observable<IFeaturedPlaylistsResponse> {
    return this.#spotify.get<IFeaturedPlaylistsResponse>('/browse/featured-playlists', {
      country: this.#conf.region,
      limit: limit.toString(),
    });
  }

  public getPlaylistTracks(playlistId: string): Observable<IPlaylistTracksResponse> {
    return this.#spotify.get<IPlaylistTracksResponse>(
      `/playlists/${playlistId}/tracks`,
      {}
    );
  }

  public search(
    query: string,
    type: SearchFilters,
    offset: number = 0,
    limit: number = 20
  ): Observable<ISearchResponse> {
    const encodedQuery = encodeURIComponent(query);

    return this.#spotify.get<ISearchResponse>('/search', {
      country: this.#conf.region,
      limit,
      offset,
      q: encodedQuery,
      type
    });
  }
}
