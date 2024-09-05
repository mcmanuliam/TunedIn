import {inject, Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PlatformTypeService {

  readonly #platform = inject(Platform)

  public get isPlatformNative(): boolean {
    return this.#platform.is('capacitor');
  }
}
