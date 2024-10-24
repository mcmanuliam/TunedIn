import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {IonTabs, IonTabBar, IonTabButton, IonIcon} from '@ionic/angular/standalone';
import {ProfilePictureComponent} from '../components/profile-picture-uploader/profile-picture.component';

@Component({
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    ProfilePictureComponent
  ],
  standalone: true,
  templateUrl: './tabs.page.pug'
})
export class TabsPage {}
