import {bootstrapApplication} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';
import {provideUserInitialization} from './providers/user-initialisation';
import {register as registerSwiperElements} from 'swiper/element/bundle';
import {provideIonIcons} from './providers/ion-icon';
import {provideHttpClient} from '@angular/common/http';
import {AppComponent} from './app/app.component';
import {routes} from './app/app.routes';

registerSwiperElements(),
bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideUserInitialization(),
    provideIonIcons(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
