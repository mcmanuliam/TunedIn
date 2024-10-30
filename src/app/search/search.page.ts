import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {IonContent, IonList, IonItem, IonThumbnail, IonSearchbar, IonIcon, IonLabel, IonSkeletonText, IonToolbar, IonHeader, IonInfiniteScrollContent, IonInfiniteScroll, IonChip} from '@ionic/angular/standalone';
import type {Observable} from 'rxjs';
import {finalize} from 'rxjs';
import {searchConfig} from '../../config/search';
import type {ISearchResponse} from '../../models/providers/spotify';
import {LogService} from '../../services/log.service';
import {MusicPlayerService} from '../../services/music-player.service';
import {SpotifyService} from '../../services/providers/spotify.service';
import {SearchFilters} from '../../util/enums/search-filter-types.enum';
import {Memoise} from '../../util/memoise/memoise.decorator';
import {PlaylistItemComponent} from '../components/items/playlist/playlist-item.component';
import {SongItemComponent} from '../components/items/song/song-item.component';

const enum Conf {
    LIMIT_PER_PAGE = 20
}

@Component({
  imports: [
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonToolbar,
    IonSkeletonText,
    IonHeader,
    IonChip,
    IonLabel,
    IonSearchbar,
    IonThumbnail,
    IonInfiniteScroll,
    SongItemComponent,
    PlaylistItemComponent,
    IonInfiniteScrollContent
  ],
  standalone: true,
  styleUrls: ['../components/general-component.scss', './search.page.scss'],
  templateUrl: './search.page.pug',
})
export class SearchComponent {
  public query: string = '';

  public results: ISearchResponse = {};

  public isLoading: boolean = false;

  public selectedFilter: SearchFilters = SearchFilters.TRACK;

  public searchFilters = SearchFilters;

  public searchConfig = searchConfig;

  public hasMoreResults: boolean = true;

  #limit: number = Conf.LIMIT_PER_PAGE;

  #offset: number = 0;

  #total: number = 0;

  #searchTimeout?: number;

  readonly #spotifySvc = inject(SpotifyService);

  readonly #musicPlayerSvc = inject(MusicPlayerService);

  @Memoise()
  private fetch(
    query: string,
    type: SearchFilters,
    offset: number,
    limit: number
  ): Observable<ISearchResponse> {
    return this.#spotifySvc.search(query, type, offset, limit)
  }

  public onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.query = inputElement.value?.trim() ?? '';

    if (this.#searchTimeout) {
      window.clearTimeout(this.#searchTimeout);
    }

    this.#reset();
    this.hasMoreResults = true;

    if (this.query) {
      this.#searchTimeout = window.setTimeout(() => {
        this.#search();
      }, 300);
    }
  }

  public setFilter(filter: SearchFilters): void {
    if (this.selectedFilter === filter) return;

    this.selectedFilter = filter;
    this.#reset();
    this.hasMoreResults = true;

    if (this.query) {
      this.#search();
    }
  }

  public async loadMore(event: Event): Promise<void> {
    const infiniteScroll = event.target as HTMLIonInfiniteScrollElement;

    if (!this.hasMoreResults || this.isLoading) {
      await infiniteScroll.complete();
      return;
    }

    this.#offset += this.#limit;
    this.#search();
    await infiniteScroll.complete();
  }

  #search(): void {
    if (!this.query || this.isLoading) return;

    this.isLoading = true;

    this.fetch(this.query, this.selectedFilter, this.#offset, this.#limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        error: (error) => {
          LogService.error('Search error', 'search.page.search', error);
          this.hasMoreResults = false;
        },
        next: (response) => {
          const filterKey = `${this.selectedFilter}s` as keyof ISearchResponse;
          const newItems = response[filterKey]?.items || [];
          this.#total = response[filterKey]?.total || 0;

          if (this.#offset === 0) {
            this.results = {
              [filterKey]: {
                items: newItems,
                total: this.#total
              }
            };
          } else {
            this.results = {
              ...this.results,
              [filterKey]: {
                items: [
                  ...(this.results[filterKey]?.items || []),
                  ...newItems
                ],
                total: this.#total
              }
            };
          }

          this.hasMoreResults = (this.results[filterKey]?.items?.length || 0) < this.#total;
        }
      });
  }

  #reset(): void {
    this.#offset = 0;
    this.#total = 0;
    this.results = {};
  }
}