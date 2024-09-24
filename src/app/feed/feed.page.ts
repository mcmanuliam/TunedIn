import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonContent, IonHeader, IonToolbar, IonSkeletonText, IonThumbnail} from '@ionic/angular/standalone';

@Component({
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSkeletonText,
    IonThumbnail
  ],
  selector: 'feed',
  standalone: true,
  templateUrl: './feed.page.pug'
})
export class FeedPage {}
