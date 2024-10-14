import {CommonModule} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonContent, IonHeader, IonToolbar, IonButton, IonIcon, IonTitle} from '@ionic/angular/standalone';
import {feedConfig} from '../../config/feed';
import {FeaturedPlaylistsComponent} from '../components/featured-playlists/featured-playlists.component';
import {ProfilePicUploaderComponent} from '../components/profile-picture-uploader/profile-picture-uploader.component';
import {RecentReleasesComponent} from '../components/recent-releases/recent-releases.component';

@Component({
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    RecentReleasesComponent,
    FeaturedPlaylistsComponent,
    IonButton,
    IonIcon,
    IonTitle,
    ProfilePicUploaderComponent,
  ],
  selector: 'feed',
  standalone: true,
  styleUrls: ['./feed.page.scss'],
  templateUrl: './feed.page.pug',
})
export class FeedPage {
  @ViewChild(IonContent, {static: false})
  public readonly content!: IonContent;

  public readonly feedConf = feedConfig;

  public async scrollToTop(event: MouseEvent): Promise<void> {
    const y = event.clientY;
    if (y < this.feedConf.scrollTop) {
      await this.content.scrollToTop(300);
    }
  }
}
