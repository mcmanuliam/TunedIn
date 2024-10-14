import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {IonContent, IonSkeletonText} from '@ionic/angular/standalone';
import type {IPlaylist} from '../../../models/spotify';
import {SpotifyService} from '../../../services/spotify.service';

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
  selector: 'featured-playlists',
  standalone: true,
  styleUrls: ['./featured-playlists.component.scss'],
  templateUrl: './featured-playlists.component.pug',
})
export class FeaturedPlaylistsComponent implements OnInit {
  readonly #spotifyService = inject(SpotifyService);

  readonly #cdr = inject(ChangeDetectorRef);

  public featuredPlaylists: IPlaylist[] = [];

  public isLoading: boolean = false;

  readonly #limit = Conf.LIMIT;

  public ngOnInit(): void {
    this.#fetchFeaturedPlaylists();
  }

  #fetchFeaturedPlaylists(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.#spotifyService.getFeaturedPlaylists(this.#limit)
      .subscribe((response) => {
        if (response.playlists.items.length <= 0) {
          this.isLoading = false;
          return;
        }

        this.featuredPlaylists = response.playlists.items;
        this.#cdr.detectChanges();
        this.isLoading = false;
      });
  }
}
