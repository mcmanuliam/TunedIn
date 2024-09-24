import type {Provider} from '@angular/core';
import {APP_INITIALIZER} from '@angular/core';
import {addIcons} from 'ionicons';
import {
  eyeOffOutline,
  eyeOutline,
  helpCircle,
  warning,
  home,
  navigateCircle,
  heartOutline,
  closeOutline,
  person,
  menu,
  chevronForwardOutline,
} from 'ionicons/icons';

/**
 * Provides a custom initializer for loading specific ion-icons
 * @returns {Provider[]} - An array of providers including the icon initializer.
 */
export function provideIonIcons(): Provider[] {
  return [
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: () => () => {
        addIcons({
          'chevron-forward-outline': chevronForwardOutline,
          'close-outline': closeOutline,
          'eye-off-outline': eyeOffOutline,
          'eye-outline:': eyeOutline,
          'heart-outline': heartOutline,
          'help-circle': helpCircle,
          home,
          menu,
          'navigate-circle': navigateCircle,
          person,
          warning
        });
      },
    },
  ];
}
