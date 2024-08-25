import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';

@Component({
  imports: [IonApp, IonRouterOutlet],
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.pug',
})
export class AppComponent {}
