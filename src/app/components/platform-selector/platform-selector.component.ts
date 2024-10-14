import {Component} from '@angular/core';
import {IonSkeletonText} from '@ionic/angular/standalone';
import {ProfilePicUploaderComponent} from '../profile-picture-uploader/profile-picture-uploader.component';

@Component({
  imports: [
    IonSkeletonText,
    ProfilePicUploaderComponent
  ],
  selector: 'profile',
  standalone: true,
  templateUrl: './platform-selector.component.pug',
})
export class FeedPage {}