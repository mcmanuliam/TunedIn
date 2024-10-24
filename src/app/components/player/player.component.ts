import {CommonModule} from '@angular/common';
import type {OnDestroy, OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {IonIcon, IonButton, IonThumbnail, IonLabel, IonItem, IonProgressBar} from '@ionic/angular/standalone';
import * as moment from 'moment';
import type {Subscription} from 'rxjs';
import type {ITrack} from '../../../models/providers/spotify';
import {MusicPlayerService} from '../../../services/music-player.service';
import {unsubscribeFromAll} from '../../../util/functions/unsubscribe-from-all';

@Component({
  imports: [
    CommonModule,
    IonIcon,
    IonButton,
    IonThumbnail,
    IonLabel,
    IonItem,
    IonProgressBar,
  ],
  selector: 'music-player',
  standalone: true,
  styleUrls: ['./player.component.scss'],
  templateUrl: './player.component.pug'
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  public readonly musicPlayerSvc = inject(MusicPlayerService)

  readonly #cdr = inject(ChangeDetectorRef)

  public currentTrack: ITrack | null = null;

  public isPlaying: boolean = false;

  #subs$: Subscription[] = [];

  public ngOnInit(): void {
    const isPlaying = this.musicPlayerSvc.isPlaying$
      .subscribe(playing => {
        this.isPlaying = playing;
        this.#cdr.markForCheck();
      })

    const currentTrack = this.musicPlayerSvc.currentTrack$
      .subscribe(track => {
        if (!track) {
          this.isPlaying = false;
          this.currentTrack = null;
        }

        this.currentTrack = track;
        this.#cdr.markForCheck();
      })

    this.#subs$.push(
      isPlaying,
      currentTrack
    )
  }

  public ngOnDestroy(): void {
    if (this.#subs$) {
      unsubscribeFromAll(this.#subs$)
    }
  }

  public formatDuration(ms: number): string {
    return moment.utc(ms).format('mm:ss');
  }

  public async togglePlayPause(): Promise<void> {
    await this.musicPlayerSvc.togglePlayPause();
  }

  public getArtists(track: ITrack): string {
    return track.artists.map(artist => artist.name).join(', ');
  }
}
