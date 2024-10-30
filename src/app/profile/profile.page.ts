import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {IonContent, IonButton, IonHeader, IonToolbar, IonIcon, IonItem, IonList} from '@ionic/angular/standalone';
import type {IUserProfile} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {ProfilePictureComponent} from '../components/profile-picture-uploader/profile-picture.component';

@Component({
  imports: [
    IonContent,
    IonButton,
    IonHeader,
    IonToolbar,
    IonIcon,
    IonItem,
    IonList,
    ProfilePictureComponent
  ],
  standalone: true,
  styleUrls: ['./profile.page.scss'],
  templateUrl: './profile.page.pug',
})
export class ProfilePage {
  public readonly userSvc = inject(UserService);

  public readonly authSvc = inject(AuthService);

  public user: IUserProfile | null;

  readonly #router = inject(Router);

  public constructor() {
    this.user = this.userSvc.user;
  }

  public async settings(): Promise<void> {
    await this.#router.navigate(['/tabs/profile/settings'])
  }
}
