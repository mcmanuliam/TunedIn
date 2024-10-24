import type {Provider} from '@angular/core';
import {APP_INITIALIZER} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {AuthService} from '../services/auth.service';

/**
 * Provides a custom initializer
 * @returns {Provider[]} - An array of providers including the event listener initializer.
 */
export function provideAppEventListeners(): Provider[] {
  return [
    {
      deps: [Platform, Router, AuthService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (platform: Platform) => async () => {
        await platform.ready();
      }
    }
  ];
}
