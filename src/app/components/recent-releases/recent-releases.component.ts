import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {IonContent,IonSkeletonText} from '@ionic/angular/standalone';
import type {IAlbum, IArtist} from '../../../models/providers/spotify';
import {SpotifyService} from '../../../services/providers/spotify.service';

const enum Conf {
  LIMIT = 10
}

@Component({
  imports: [
    CommonModule,
    IonContent,
    IonSkeletonText
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'recent-releases',
  standalone: true,
  styleUrls: ['../home-page-swipers.scss'],
  templateUrl: './recent-releases.component.pug',
})
export class RecentReleasesComponent implements OnInit {
  readonly #spotifySvc = inject(SpotifyService);

  readonly #cdr = inject(ChangeDetectorRef);

  public newReleases: IAlbum[] = [];

  public isLoading: boolean = false;

  readonly #limit = Conf.LIMIT;

  public ngOnInit() {
    this.#fetchNewReleases();
  }

  public getArtists(artists: IArtist[]): string {
    return artists.map(artist => artist.name).join(', ')
  }

  #fetchNewReleases(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.#spotifySvc.getRecentReleases(this.#limit)
      .subscribe((response) => {
        if (response.albums.items.length <= 0) {
          this.isLoading = false;
          return;
        }

        this.newReleases = response.albums.items;
        this.#cdr.detectChanges();
        this.isLoading = false;
      });
  }
}
