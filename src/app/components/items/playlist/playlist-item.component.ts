import {Component, Input} from '@angular/core';
import {IonItem, IonLabel, IonIcon, IonThumbnail, IonButton} from '@ionic/angular/standalone';
import type {IPlaylist} from '../../../../models/providers/spotify';
import {FormatDurationPipe} from '../../../../util/format-duration.pipe';

@Component({
  imports: [
    IonItem,
    IonLabel,
    IonIcon,
    IonThumbnail,
    IonButton,
    FormatDurationPipe,
  ],
  selector: 'playlist-item',
  standalone: true,
  styleUrls: ['../item-styling.scss'],
  templateUrl: './playlist-item.component.pug',

})
export class PlaylistItemComponent {
  @Input()
  public playlist!: IPlaylist;
}
