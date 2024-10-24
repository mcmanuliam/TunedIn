import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {IonContent, IonList, IonItem, IonLabel, IonIcon, IonThumbnail, IonButton, IonSkeletonText} from '@ionic/angular/standalone';
import {spotifyConfig} from '../../../config/providers/spotify';
import type {ITrack} from '../../../models/providers/spotify';
import {MusicPlayerService} from '../../../services/music-player.service';
import {SpotifyService} from '../../../services/providers/spotify.service';

const enum Conf {
    STARTING_DISPLAY_COUNT = 5,
    SHOW_MORE_DISPLAY_COUNT = 50,
}

@Component({
  imports: [
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
    IonThumbnail,
    IonSkeletonText
  ],
  selector: 'charts',
  standalone: true,
  styleUrls: ['../home-page-swipers.scss', './charts.component.scss'],
  templateUrl: './charts.component.pug',
})
export class ChartsComponent implements OnInit {
  readonly #spotifySvc = inject(SpotifyService);

  readonly #musicPlayerSvc = inject(MusicPlayerService)

  readonly #spotifyConf = spotifyConfig;

  readonly #cdr = inject(ChangeDetectorRef);

  public topTracks: ITrack[] = [];

  public isLoading: boolean = false;

  public displayLimit: number = Conf.STARTING_DISPLAY_COUNT;

  public ngOnInit(): void {
    this.#fetchTopSongs();
  }

  public getArtists(track: ITrack): string {
    return track.artists.map(artist => artist.name).join(', ')
  }

  #fetchTopSongs(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.#spotifySvc.getPlaylistTracks(this.#spotifyConf.charts)
      .subscribe((response) => {
        if (response.items.length <= 0) {
          this.isLoading = false;
          return;
        }

        this.topTracks = response.items.map(item => item.track);
        this.isLoading = false;

        this.#cdr.detectChanges();
      });
  }

  public showMore(): void {
    this.displayLimit = Conf.SHOW_MORE_DISPLAY_COUNT;
    this.#cdr.detectChanges();
  }

  public showLess(): void {
    this.displayLimit = Conf.STARTING_DISPLAY_COUNT;
    this.#cdr.detectChanges();
  }

  public play(track: ITrack): void {
    this.#musicPlayerSvc.playTrack(track);
  }
}
