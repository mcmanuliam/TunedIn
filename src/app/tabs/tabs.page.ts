import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {Component, inject} from '@angular/core';
import {Keyboard} from '@capacitor/keyboard';
import {IonTabs, IonTabBar, IonTabButton, IonIcon} from '@ionic/angular/standalone';
import {LogService} from '../../services/log.service';
import {PlatformTypeService} from '../../services/platform-type.service';
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
export class TabsPage implements OnInit {
  public isKeyboardVisible = false;

  readonly #platformSvc = inject(PlatformTypeService)

  public ngOnInit(): void {
    if (this.#platformSvc.isPlatformNative){
      Keyboard.addListener('keyboardWillShow', () => {
        this.isKeyboardVisible = true;
      }).catch((error: string) => LogService.error(error, 'tabs.page.keyboardWillShow'));

      Keyboard.addListener('keyboardWillHide', () => {
        this.isKeyboardVisible = false;
      }).catch((error: string) => LogService.error(error, 'tabs.page.keyboardWillHide'));
    }
  }
}
