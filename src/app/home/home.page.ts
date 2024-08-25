import {Component} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/angular/standalone';

@Component({
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  selector: 'app-home',
  standalone: true,
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.pug',
})
export class HomePage {}
