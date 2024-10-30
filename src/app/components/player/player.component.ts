import {CommonModule} from '@angular/common';
import type {OnDestroy, OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, inject, ElementRef} from '@angular/core';
import type {Gesture} from '@ionic/angular';
import {GestureController} from '@ionic/angular';
import {IonIcon, IonButton, IonThumbnail, IonLabel, IonItem, IonProgressBar} from '@ionic/angular/standalone';
import type {Subscription} from 'rxjs';
import {playerConfig} from '../../../config/player';
import type {ITrack} from '../../../models/providers/spotify';
import {ColourSchemeService} from '../../../services/colour-scheme.service';
import {LogService} from '../../../services/log.service';
import {MusicPlayerService} from '../../../services/music-player.service';
import {FormatDurationPipe} from '../../../util/format-duration.pipe';
import {getFadedColour} from '../../../util/functions/get-faded-colour';
import {extractDominantColour} from '../../../util/functions/image-colour-theif';
import {unsubscribeFromAll} from '../../../util/functions/unsubscribe-from-all';

const enum Conf {
  DEFAULT_COLOUR = 'rgb(0, 0, 0)',
  LIGHT_MODE_OPACITY = 0.15,
  DARK_MODE_OPACITY = 0.5,
}

@Component({
  imports: [
    CommonModule,
    IonIcon,
    IonButton,
    IonThumbnail,
    IonLabel,
    IonItem,
    IonProgressBar,
    FormatDurationPipe
  ],
  selector: 'music-player',
  standalone: true,
  styleUrls: ['./player.component.scss'],
  templateUrl: './player.component.pug'
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  public currentTrack: ITrack | null = null;

  public isPlaying: boolean = false;

  public duration: number = 0;

  public dominantColour: string = Conf.DEFAULT_COLOUR;

  readonly #musicPlayerSvc = inject(MusicPlayerService);

  readonly #elementRef = inject(ElementRef);

  readonly #cdr = inject(ChangeDetectorRef);

  readonly #colourSchemeService = inject(ColourSchemeService);

  readonly #gestureCtrl = inject(GestureController);

  readonly #playerConf = playerConfig;

  #gesture: Gesture | null = null;

  #subs$: Subscription[] = [];

  public ngOnInit(): void {
    this.#showPlayer();
    this.#initializeSwipeGesture();

    const isPlaying = this.#musicPlayerSvc.isPlaying$
      .subscribe(playing => {
        this.isPlaying = playing;
        this.#cdr.markForCheck();
      });

    const currentTrack = this.#musicPlayerSvc.currentTrack$
      .subscribe(track => {
        if (!track) {
          this.isPlaying = false;
          this.currentTrack = null;
          this.dominantColour = Conf.DEFAULT_COLOUR;
        } else {
          this.currentTrack = track;
          void this.#updateDominantColour(track);
          this.#showPlayer();
        }
        this.#cdr.markForCheck();
      });

    const durationSub = this.#musicPlayerSvc.duration$
      .subscribe(duration => {
        this.duration = duration;
        this.#cdr.markForCheck();
      });

    const colorSchemeSub = this.#colourSchemeService.colorScheme$
      .subscribe(isDarkMode => {
        this.#updateGradient(this.dominantColour, isDarkMode);
      });

    this.#subs$.push(
      isPlaying,
      currentTrack,
      durationSub,
      colorSchemeSub
    );
  }

  public ngOnDestroy(): void {
    if (this.#subs$) {
      unsubscribeFromAll(this.#subs$);
    }

    if (this.#gesture) {
      this.#gesture.destroy();
    }
  }

  public async togglePlayPause(): Promise<void> {
    await this.#musicPlayerSvc.togglePlayPause();
  }

  public getArtists(track: ITrack): string {
    return track.artists.map(artist => artist.name).join(', ');
  }

  async #updateDominantColour(track: ITrack): Promise<void> {
    if (track.album.images[0]?.url) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = track.album.images[0].url;

      try {
        const colour = await extractDominantColour(img);
        this.dominantColour = colour;
        this.#updateGradient(colour, this.#colourSchemeService.isDarkMode$);
        this.#cdr.markForCheck();
      } catch (error) {
        LogService.error('Error extracting dominant colour', 'player.component.updateDominantColour', error);
      }
    }
  }

  #updateGradient(colour: string, isDarkMode: boolean): void {
    const playerElement = this.#elementRef.nativeElement.querySelector('ion-item');

    if (playerElement) {
      if (isDarkMode) {
        const darkColour = getFadedColour(colour, Conf.DARK_MODE_OPACITY);
        const gradient = `linear-gradient(to bottom left, ${darkColour}, var(--ion-player-background))`;

        playerElement.style.setProperty('--background', gradient);
      } else {
        const lightColour = getFadedColour(colour, Conf.LIGHT_MODE_OPACITY);
        const gradient = `linear-gradient(to bottom left, ${lightColour}, var(--ion-player-background))`;

        playerElement.style.setProperty('--background', gradient);
      }
    }
  }

  #initializeSwipeGesture(): void {
    const element = this.#elementRef.nativeElement;

    this.#gesture = this.#gestureCtrl.create({
      direction: 'y',
      el: element,
      gestureName: 'swipe-down-to-dismiss',
      onEnd: ev => {
        if (ev.deltaY > this.#playerConf.pulldownDismissThreshold) {
          this.#dismissPlayer();
        } else {
          element.style.transition = 'transform 0.3s ease-out';
          element.style.transform = '';
          setTimeout(() => {
            element.style.transition = '';
          }, 300);
        }
      },
      onMove: ev => {
        if (ev.deltaY > 0) {
          element.style.transform = `translateY(${ev.deltaY}px)`;
        }
      },
      threshold: 10,
    });

    this.#gesture.enable(true);
  }

  #dismissPlayer(): void {
    const element = this.#elementRef.nativeElement;
    element.style.transition = 'transform 0.3s ease-out';
    element.style.transform = 'translateY(100%)';

    this.#musicPlayerSvc.close();
    this.currentTrack = null;
  }

  #showPlayer(): void {
    const element = this.#elementRef.nativeElement;
    element.style.transition = 'transform 0.3s ease-out';
    element.style.transform = 'translateY(0)';

    setTimeout(() => {
      element.style.transition = '';
    }, 300);
  }
}