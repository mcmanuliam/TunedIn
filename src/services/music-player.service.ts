import {Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import type {ITrack} from '../models/providers/spotify';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  public currentTrack$: Observable<ITrack | null>;

  public isPlaying$: Observable<boolean>;

  public duration$: Observable<number>;

  readonly #audio = new Audio();

  readonly #currentTrack = new BehaviorSubject<ITrack | null>(null);

  readonly #isPlaying = new BehaviorSubject<boolean>(false);

  readonly #duration = new BehaviorSubject<number>(0);

  #animationFrameId: number | null = null;

  public constructor() {
    this.#audio.addEventListener('ended', () => {
      this.#isPlaying.next(false);
      this.#stopProgressAnimation();
      this.#duration.next(0);
    });

    this.#audio.addEventListener('pause', () => {
      this.#isPlaying.next(false);
      this.#stopProgressAnimation();
    });

    this.#audio.addEventListener('play', () => {
      this.#isPlaying.next(true);
      this.#startProgressAnimation();
    });

    this.currentTrack$ = this.#currentTrack.asObservable();
    this.isPlaying$ = this.#isPlaying.asObservable();
    this.duration$ = this.#duration.asObservable();
  }

  public playTrack(track: ITrack): void {
    const currentTrack = this.#currentTrack.getValue();
    if (currentTrack !== track) {
      this.pauseTrack();
      this.#audio.src = track.preview_url || '';
      this.#audio.load();

      this.#audio.play()
        .then(() => {
          this.#currentTrack.next(track);
          this.#isPlaying.next(true);
        })
        .catch((error) => {
          LogService.error("Audio playback error", 'music-player.service.playTrack', error);
        });
    }
  }

  public close(): void {
    this.#isPlaying.next(false);
    this.#currentTrack.next(null);
    this.#duration.next(0);
    this.pauseTrack();
  }

  public async togglePlayPause(): Promise<void> {
    if (this.#isPlaying.value) {
      this.pauseTrack();
    } else {
      try {
        await this.#audio.play();
        this.#isPlaying.next(true);
      } catch (error) {
        LogService.error('Audio playback error', 'music-player.service.togglePlayPause', error);
      }
    }
  }

  public pauseTrack(): void {
    this.#audio.pause();
    this.#isPlaying.next(false);
  }

  #updateDuration(): void {
    if (this.#audio.duration > 0) {
      this.#duration.next(this.#audio.currentTime / this.#audio.duration);
    }
    // Allows us to update the progress bar quicker than every second
    this.#animationFrameId = requestAnimationFrame(() => this.#updateDuration());
  }

  #startProgressAnimation(): void {
    if (!this.#animationFrameId) {
      // Allows us to update the progress bar quicker than every second
      this.#animationFrameId = requestAnimationFrame(() => this.#updateDuration());
    }
  }

  #stopProgressAnimation(): void {
    if (this.#animationFrameId) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
  }
}
