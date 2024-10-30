import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {Component, inject, Input} from '@angular/core';
import {Keyboard} from '@capacitor/keyboard';
import {IonContent, IonFooter, IonToolbar} from '@ionic/angular/standalone';
import {LogService} from '../../services/log.service';
import {PlatformTypeService} from '../../services/platform-type.service';

@Component({
  imports: [
    CommonModule,
    IonContent,
    IonFooter,
    IonToolbar,
  ],
  selector: 'abstract-auth-page',
  standalone: true,
  styleUrls: ['./abstract.auth.page.scss'],
  templateUrl: './abstract.auth.page.pug',
})
export class AbstractAuthPage implements OnInit {
  @Input()
  public heading: string = 'Lorem Ipsum';

  @Input()
  public description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  public isKeyboardVisible = false;

  readonly #platformSvc = inject(PlatformTypeService)

  public ngOnInit(): void {
    if (this.#platformSvc.isPlatformNative){
      Keyboard.addListener('keyboardWillShow', () => {
        this.isKeyboardVisible = true;
      }).catch((error: string) => LogService.error(error, 'abstract.auth.page.keyboardWillShow'));

      Keyboard.addListener('keyboardWillHide', () => {
        this.isKeyboardVisible = false;
      }).catch((error: string) => LogService.error(error, 'abstract.auth.page.keyboardWillHide'));
    }
  }
}