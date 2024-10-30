import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import type {IEventsResponse} from '../../models/providers/ticketmaster';
import {TicketmasterImpl} from '../../util/providers/ticketmaster';

type Sort = 'date,asc' | 'date,desc' | 'relevance,asc' | 'relevance,desc';

interface EventParams {
  limit?: number;

  radius?: number;

  latitude?: number;

  longitude?: number;

  startDateTime?: string;

  endDateTime?: string;

  sort?: Sort;
}

@Injectable({
  providedIn: 'root'
})
export class TicketmasterService {
  readonly #ticketmaster = inject(TicketmasterImpl);

  public getTrendingConcerts(limit: number = 10): Observable<IEventsResponse> {
    return this.#getConcerts({
      limit,
      sort: 'relevance,desc'
    });
  }

  public getNearbyVenueConcerts(
    latitude: number,
    longitude: number,
    limit: number = 10
  ): Observable<IEventsResponse> {
    return this.#getConcerts({
      latitude,
      limit,
      longitude,
      radius: 25
    });
  }

  #getConcerts(params: EventParams = {}): Observable<IEventsResponse> {
    const {
      limit = 10,
      radius = 50,
      sort = 'date,asc'
    } = params;

    const queryParams: Record<string, string> = {
      classificationName: 'music',
      radius: radius.toString(),
      segmentName: 'Music',
      size: limit.toString(),
      sort,
      unit: 'km'
    };

    if (params.latitude && params.longitude) {
      queryParams['latlong'] = `${params.latitude},${params.longitude}`;
    }

    if (params.startDateTime) {
      queryParams['startDateTime'] = params.startDateTime;
    }

    if (params.endDateTime) {
      queryParams['endDateTime'] = params.endDateTime;
    }

    return this.#ticketmaster.get('/discovery/v2/events', queryParams);
  }
}