import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {IonContent, IonSkeletonText} from '@ionic/angular/standalone';
import type {IEventsResponse} from '../../../../models/providers/ticketmaster';
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
  selector: 'trending-concerts',
  standalone: true,
  styleUrls: ['../../general-component.scss'],
  templateUrl: './trending-concerts.component.pug',
})
export class TrendingConcertsComponent extends AbstractConcertsSwiper implements OnInit {
  readonly #ticketmasterService = inject(TicketmasterService);

  readonly #cdr = inject(ChangeDetectorRef);

  readonly #limit = Conf.LIMIT;

  public ngOnInit(): void {
    this.#fetchTrendingConcerts();
  }

  #fetchTrendingConcerts(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.#ticketmasterService.getTrendingConcerts(this.#limit)
      .subscribe((response: IEventsResponse) => {
        if (!response._embedded?.events || response._embedded.events.length <= 0) {
          this.isLoading = false;
          return;
        }

        this.concerts = response._embedded.events;
        this.#cdr.detectChanges();
        this.isLoading = false;
      });
  }
}