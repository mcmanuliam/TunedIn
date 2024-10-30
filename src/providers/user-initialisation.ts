import type {Provider} from '@angular/core';
import {APP_INITIALIZER} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {AuthService} from '../services/auth.service';
import {LogService} from '../services/log.service';
import {UserService} from '../services/user.service';

/**
 * Provides a custom initializer that pulls user data and stores it in the UserService.
 * Utilizes Capacitor Storage to persist data for offline use.
 * @returns {Provider[]} - An array of providers including the user initializer.
 */
export function provideUserInitialization(): Provider[] {
  const storage = new Storage();

  return [
    {
      deps: [AuthService, UserService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (authSvc: AuthService, userSvc: UserService) => async () => {
        await Promise.all([
          await storage.create(),
          await authSvc.restoreSession(),
        ])
        const sessionUser = await authSvc.getCurrentUser();
        if (!sessionUser) {
          LogService.warn('No session user, rerouting to sign-in', 'user-initialisation.useFactory');
          return;
        }
        await userSvc.get(sessionUser.id);
        return;
      }
    },
    {provide: Storage, useValue: storage},
  ];
}
