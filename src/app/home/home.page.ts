import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle} from '@ionic/angular/standalone';

@Component({
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.pug',
})
export class HomePage {}
