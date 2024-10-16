import {HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import {of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {spotifyConfig} from 'src/config/spotify';

export interface ITokenRes {
  access_token: string;

  expires_in: number
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token';

@Injectable({
  providedIn: 'root',
})
export class Spotify {
  readonly #http = inject(HttpClient);

  readonly #spotifyConfig = spotifyConfig;

  private accessToken: string | null = null;

  private tokenExpiry: number | null = null;

  public get<T>(endpoint: string, params: GenericObject<any>): Observable<T> {
    return this.#getValidToken()
      .pipe(
        switchMap((token: string) => {
          const httpParams = new HttpParams({fromObject: params});
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
          });

          return this.#http.get<T>(`${this.#spotifyConfig.baseUrl}${endpoint}`, {
            headers,
            params: httpParams,
          });
        })
      );
  }

  #getValidToken(): Observable<string> {
    const now = Date.now();
    if (this.accessToken && this.tokenExpiry && now < this.tokenExpiry) {
      return of(this.accessToken);
    }

    return this.#getSpotifyToken().pipe(
      map((response) => {
        this.accessToken = response.access_token;
        this.tokenExpiry = now + (response.expires_in * 1000);
        return this.accessToken;
      })
    );
  }

  #getSpotifyToken(): Observable<ITokenRes> {
    const authHeader = btoa(`${this.#spotifyConfig.clientId}:${this.#spotifyConfig.clientSecret}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');
    return this.#http.post<ITokenRes>(TOKEN_URL, body.toString(), {headers});
  }
}
