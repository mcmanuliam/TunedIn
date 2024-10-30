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
  addOutline,
  hammer,
  chevronUpOutline,
  chevronDownOutline,
  play,
  pause,
  search,
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
          'add-outline': addOutline,
          'chevron-down-outline': chevronDownOutline,
          'chevron-forward-outline': chevronForwardOutline,
          'chevron-up-outline': chevronUpOutline,
          'close-outline': closeOutline,
          'eye-off-outline': eyeOffOutline,
          'eye-outline:': eyeOutline,
          hammer,
          'heart-outline': heartOutline,
          'help-circle': helpCircle,
          home,
          menu,
          'navigate-circle': navigateCircle,
          pause,
          person,
          play,
          search,
          warning
        });
      },
    },
  ];
}
