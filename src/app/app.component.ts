import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {SharedModule} from './shared.module';

@Component({
  imports: [
    IonApp,
    IonRouterOutlet,
    SharedModule,
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.pug',
})
export class AppComponent {}
