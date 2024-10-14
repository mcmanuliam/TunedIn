import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import type {INewReleasesResponse, IFeaturedPlaylistsResponse} from '../models/spotify';
import {Spotify} from '../util/spotify';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  readonly #spotify = inject(Spotify);

  public getRecentReleases(limit: number = 10): Observable<INewReleasesResponse> {
    return this.#spotify.get<INewReleasesResponse>('/browse/new-releases', {
      country: 'UK',
      limit: limit.toString(),
    });
  }

  public getFeaturedPlaylists(limit: number = 10): Observable<IFeaturedPlaylistsResponse> {
    return this.#spotify.get<IFeaturedPlaylistsResponse>('/browse/featured-playlists', {
      country: 'UK',
      limit: limit.toString(),
    });
  }
}