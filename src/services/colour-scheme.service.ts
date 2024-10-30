import {NgZone, inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColourSchemeService {
  #colorSchemeSubject: BehaviorSubject<boolean>;

  #colorSchemeMediaQuery: MediaQueryList;

  readonly #ngZone = inject(NgZone);

  public constructor() {
    this.#colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.#colorSchemeSubject = new BehaviorSubject<boolean>(this.#colorSchemeMediaQuery.matches);

    this.#colorSchemeMediaQuery.addEventListener('change', this.onColorSchemeChange.bind(this));
  }

  private onColorSchemeChange(event: MediaQueryListEvent): void {
    this.#ngZone.run(() => {
      this. #colorSchemeSubject.next(event.matches);
    });
  }

  /**
   * @returns {boolean} `True` if dark mode, `false` if light
   */
  public get isDarkMode$(): boolean {
    return this.#colorSchemeSubject.value;
  }

  /**
   * Provides an observable to subscribe to color scheme changes.
   * @returns {Observable<boolean>} Emits `true` if dark mode is enabled, otherwise `false`.
   */
  public get colorScheme$(): Observable<boolean> {
    return this.#colorSchemeSubject.asObservable();
  }
}
