import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {IonContent,IonSkeletonText} from '@ionic/angular/standalone';
import type {Observable} from 'rxjs';
import type {IAlbum, IArtist, INewReleasesResponse} from '../../../models/providers/spotify';
import {SpotifyService} from '../../../services/providers/spotify.service';
import {Memoise} from '../../../util/memoise/memoise.decorator';

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
  styleUrls: ['../general-component.scss'],
  templateUrl: './recent-releases.component.pug',
})
export class RecentReleasesComponent implements OnInit {
  public newReleases: IAlbum[] = [];

  public isLoading: boolean = false;

  readonly #spotifySvc = inject(SpotifyService);

  readonly #cdr = inject(ChangeDetectorRef);

  readonly #limit = Conf.LIMIT;

  @Memoise()
  private fetch(): Observable<INewReleasesResponse> {
    return this.#spotifySvc.getRecentReleases(this.#limit)
  }

  public ngOnInit(): void {
    this.#fetchNewReleases();
  }

  public getArtists(artists: IArtist[]): string {
    return artists.map(artist => artist.name).join(', ')
  }

  #fetchNewReleases(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.fetch()
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
