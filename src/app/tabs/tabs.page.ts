import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {IonTabs, IonTabBar, IonTabButton, IonIcon} from '@ionic/angular/standalone';
import {ProfilePicUploaderComponent} from '../components/profile-picture-uploader/profile-picture-uploader.component';

@Component({
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    ProfilePicUploaderComponent
  ],
  standalone: true,
  styleUrls: ['./tabs.page.scss'],
  templateUrl: './tabs.page.pug'
})
export class TabsPage {}
