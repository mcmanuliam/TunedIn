import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {IonTabs, IonTabBar, IonTabButton, IonIcon} from '@ionic/angular/standalone';

@Component({
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
  ],
  standalone: true,
  templateUrl: './tabs.page.pug'
})
export class TabsPage {}
