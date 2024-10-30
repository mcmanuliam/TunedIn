import {HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import {of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {spotifyConfig} from '../../config/providers/spotify';

export interface ITokenRes {
  access_token: string;

  expires_in: number
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token';

@Injectable({
  providedIn: 'root',
})
export class SpotifyImpl {
  readonly #http = inject(HttpClient);

  readonly #spotifyCfg = spotifyConfig;

  #accessToken: string | null = null;

  #tokenExpiry: number | null = null;

  public get<T>(endpoint: string, params: GenericObject<any>): Observable<T> {
    return this.#getValidToken().pipe(
      switchMap((token: string) => {
        const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
          if (value != null) {
            acc[key] = value.toString();
          }
          return acc;
        }, {} as Record<string, string>);

        cleanParams['market'] = this.#spotifyCfg.region;
        const httpParams = new HttpParams({fromObject: cleanParams});
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.#http.get<T>(`${this.#spotifyCfg.baseUrl}${endpoint}`, {
          headers,
          params: httpParams,
        });
      })
    );
  }

  #getValidToken(): Observable<string> {
    const now = Date.now();
    if (this.#accessToken && this.#tokenExpiry && now < this.#tokenExpiry) {
      return of(this.#accessToken);
    }

    return this.#getSpotifyToken().pipe(
      map((response) => {
        this.#accessToken = response.access_token;
        this.#tokenExpiry = now + (response.expires_in * 1000);
        return this.#accessToken;
      })
    );
  }

  #getSpotifyToken(): Observable<ITokenRes> {
    const authHeader = btoa(`${this.#spotifyCfg.clientId}:${this.#spotifyCfg.clientSecret}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');
    return this.#http.post<ITokenRes>(TOKEN_URL, body.toString(), {headers});
  }
}
