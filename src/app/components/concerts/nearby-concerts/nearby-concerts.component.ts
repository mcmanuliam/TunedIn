import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {Geolocation} from '@capacitor/geolocation';
import {IonContent, IonSkeletonText} from '@ionic/angular/standalone';
import type {IEventsResponse} from '../../../../models/providers/ticketmaster';
import {LogService} from '../../../../services/log.service';
import {TicketmasterService} from '../../../../services/providers/ticketmaster.service';
import {AbstractConcertsSwiper} from '../abstract-concerts';

const enum Conf {
  LIMIT = 10
}

@Component({
  imports: [
    CommonModule,
    IonContent,
    IonSkeletonText,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'nearby-concerts',
  standalone: true,
  styleUrls: ['../../general-component.scss'],
  templateUrl: './nearby-concerts.component.pug',
})
export class NearbyConcertsComponent extends AbstractConcertsSwiper implements OnInit {
  readonly #ticketmasterService = inject(TicketmasterService);

  readonly #geo = Geolocation;

  readonly #cdr = inject(ChangeDetectorRef);

  readonly #limit = Conf.LIMIT;

  public async ngOnInit(): Promise<void> {
    await this.#fetchNearbyConcerts();
  }

  async #fetchNearbyConcerts(): Promise<void> {
    if (this.isLoading) return;
    this.isLoading = true;

    try {
      const coordinates = await this.#geo.getCurrentPosition();
      const {latitude, longitude} = coordinates.coords;

      this.#ticketmasterService.getNearbyVenueConcerts(latitude, longitude, this.#limit)
        .subscribe((response: IEventsResponse) => {
          if (!response._embedded?.events || response._embedded.events.length <= 0) {
            this.isLoading = false;
            return;
          }

          this.concerts = response._embedded.events;
          this.#cdr.detectChanges();
          this.isLoading = false;
        });
    } catch (error) {
      LogService.error('Error getting location', 'nearby-concerts.component.fetchNearbyConcerts', error);
    }
  }
}