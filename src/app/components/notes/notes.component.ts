import {CommonModule} from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonContent, IonSkeletonText, IonIcon, IonButton} from '@ionic/angular/standalone';
import {ProfilePictureComponent} from '../profile-picture-uploader/profile-picture.component';

@Component({
  imports: [
    CommonModule,
    IonIcon,
    IonContent,
    IonButton,
    IonSkeletonText,
    ProfilePictureComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'notes',
  standalone: true,
  styleUrls: ['./notes.component.scss'],
  templateUrl: './notes.component.pug',
})
export class NotesComponent {}