import {Component, inject, Input} from '@angular/core';
import {IonItem, IonLabel, IonIcon, IonThumbnail, IonButton} from '@ionic/angular/standalone';
import type {ITrack} from '../../../../models/providers/spotify';
import {MusicPlayerService} from '../../../../services/music-player.service';
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
  selector: 'song-item',
  standalone: true,
  styleUrls: ['../item-styling.scss'],
  templateUrl: './song-item.component.pug',

})
export class SongItemComponent {
  @Input()
  public track!: ITrack;

  #musicPlayerSvc = inject(MusicPlayerService);

  public play() {
    this.#musicPlayerSvc.playTrack(this.track);
  }

  public getArtists(track: ITrack): string {
    return track.artists.map(artist => artist.name).join(', ');
  }
}
