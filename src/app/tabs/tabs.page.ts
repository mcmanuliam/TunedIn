import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {IonContent, IonTabs, IonLabel} from '@ionic/angular/standalone';

@Component({
  imports: [
    CommonModule,
    IonContent,
    IonTabs,
    IonLabel,
  ],
  selector: 'abstract-auth-page',
  standalone: true,
  templateUrl: './tabs.page.pug'
})
export class TabsPage {}
