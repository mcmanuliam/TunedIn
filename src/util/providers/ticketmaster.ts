import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import {ticketmasterConfig} from '../../config/providers/ticketmaster';

@Injectable({
  providedIn: 'root'
})
export class TicketmasterImpl {
  readonly #http = inject(HttpClient);
  readonly #ticketmasterConfig = ticketmasterConfig;

  public get(endpoint: string, params: Record<string, string>): Observable<any> {
    const httpParams = new HttpParams({
      fromObject: {
        ...params,
        apikey: this.#ticketmasterConfig.clientId
      }
    });

    return this.#http.get(`${this.#ticketmasterConfig.baseUrl}${endpoint}`, {
      params: httpParams
    });
  }
}
