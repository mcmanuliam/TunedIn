import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import type {ITrack} from '../models/providers/spotify';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  readonly #audio = new Audio();

  readonly #currentTrack = new BehaviorSubject<ITrack | null>(null);

  readonly #isPlaying = new BehaviorSubject<boolean>(false);

  public currentTrack$ = this.#currentTrack.asObservable();

  public isPlaying$ = this.#isPlaying.asObservable();

  public duration: number = 0;

  public constructor() {
    this.#audio.addEventListener('ended', () => {
      this.#isPlaying.next(false);
    });

    this.#audio.addEventListener('timeupdate', () => {
      this.duration = this.#audio.currentTime / (this.#audio.duration || 1);
    });
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
          console.error("Audio playback error:", error);
        });
    }
  }

  public async togglePlayPause(): Promise<void> {
    if (this.#isPlaying.value) {
      this.pauseTrack();
    } else {
      try {
        await this.#audio.play();
        this.#isPlaying.next(true);
      } catch (error) {
        console.error('Audio playback error:', error);
      }
    }
  }

  public pauseTrack(): void {
    this.#audio.pause();
    this.#isPlaying.next(false);
  }
}
