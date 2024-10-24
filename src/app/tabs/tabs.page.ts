import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {IonTabs, IonTabBar, IonTabButton, IonIcon} from '@ionic/angular/standalone';
import {MusicPlayerComponent} from '../components/player/player.component';
import {ProfilePictureComponent} from '../components/profile-picture-uploader/profile-picture.component';

@Component({
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    ProfilePictureComponent,
    MusicPlayerComponent
  ],
  standalone: true,
  styleUrls: ['./tabs.page.scss'],
  templateUrl: './tabs.page.pug'
})
export class TabsPage {}
