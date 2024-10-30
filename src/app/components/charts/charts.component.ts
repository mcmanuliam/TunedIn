import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {IonContent, IonList, IonItem, IonLabel, IonIcon, IonThumbnail, IonButton, IonSkeletonText} from '@ionic/angular/standalone';
import {spotifyConfig} from '../../../config/providers/spotify';
import type {ITrack} from '../../../models/providers/spotify';
import {MusicPlayerService} from '../../../services/music-player.service';
import {SpotifyService} from '../../../services/providers/spotify.service';
import {PlaylistItemComponent} from '../items/playlist/playlist-item.component';
import {SongItemComponent} from '../items/song/song-item.component';

const enum Conf {
    STARTING_DISPLAY_COUNT = 5,
    SHOW_MORE_DISPLAY_COUNT = 10,
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
    IonSkeletonText,
    SongItemComponent,
    PlaylistItemComponent
  ],
  selector: 'charts',
  standalone: true,
  styleUrls: ['../general-component.scss', './charts.component.scss'],
  templateUrl: './charts.component.pug',
})
export class ChartsComponent implements OnInit {
  public topTracks: ITrack[] = [];

  public isLoading: boolean = false;

  public displayLimit: number = Conf.STARTING_DISPLAY_COUNT;

  readonly #spotifySvc = inject(SpotifyService);

  readonly #musicPlayerSvc = inject(MusicPlayerService)

  readonly #spotifyConf = spotifyConfig;

  readonly #cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.#fetchTopSongs();
  }

  public getArtists(track: ITrack): string {
    return track.artists.map(artist => artist.name).join(', ')
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
}
