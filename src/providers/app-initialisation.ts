import type {Provider} from '@angular/core';
import {APP_INITIALIZER} from '@angular/core';
import {Router} from '@angular/router';
import {App} from '@capacitor/app';
import {Platform} from '@ionic/angular';
import {AuthService} from '../services/auth.service';

/**
 * Provides a custom initializer that listens for app URL changes or other events
 * and handles them accordingly at app startup.
 * It utilizes Capacitor's App plugin to listen for deep links or redirects.
 * @returns {Provider[]} - An array of providers including the event listener initializer.
 */
export function provideAppEventListeners(): Provider[] {
  return [
    {
      deps: [Platform, Router, AuthService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (platform: Platform, router: Router) => async () => {
        await platform.ready();

        await App.addListener('appUrlOpen', (event): void => {
          const url = event.url;

          if (url.includes('git.mcmanuliam.tune://auth-callback')) {
            const code = new URL(url).searchParams.get('code');
            if (code) {
              try {
                // authSvc.handleSpotifyCallback(code);
                void router.navigateByUrl('/home');
              } catch (error) {
                console.error('[appUrlOpen] Error handling OAuth callback:', error);
              }
            }
          }
        });
      }
    }
  ];
}
