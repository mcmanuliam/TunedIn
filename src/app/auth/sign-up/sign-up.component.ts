import {CommonModule} from '@angular/common';
import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import type {ToastOptions} from '@ionic/angular';
import {ToastController} from '@ionic/angular';
import {IonTitle, IonInput, IonLabel, IonItem, IonButton} from '@ionic/angular/standalone';
import {AuthService} from 'src/services/auth.service';

const NON_MATCH_PASSWORDS: ToastOptions = {
  color: 'danger',
  message: 'Passwords do not match, please check your details and try again.',
  position: 'bottom',
}

const DEFAULT_ERROR: ToastOptions = {
  color: 'danger',
  message: 'Error signing up. Please try again later.',
  position: 'bottom',
}

@Component({
  imports: [
    CommonModule,
    IonTitle,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    FormsModule,
  ],
  selector: 'app-sign-up',
  standalone: true,
  styleUrls: ['../auth.page.scss'],
  templateUrl: './sign-up.component.pug',
})
export class SignupComponent {
  @Output()
  public readonly swipe = new EventEmitter<'next' | 'prev'>();

  readonly #authSvc = inject(AuthService);

  readonly #router = inject(Router);

  readonly #toastController = inject(ToastController);

  public email: string = '';

  public password: string = '';

  public confPassword: string = '';

  public prev(): void {
    this.swipe.emit('prev')
  }

  public async onSubmit(): Promise<void> {
    if (this.password !== this.confPassword) {
      const errorToast = await this.#toastController.create(NON_MATCH_PASSWORDS);
      await errorToast.present();
      return;
    }

    try {
      if (await this.#authSvc.doesEmailExist(this.email)) {
        const errorToast = await this.#toastController.create(NON_MATCH_PASSWORDS);
        await errorToast.present();
        return;
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      await Promise.all([
        await this.#authSvc.signUp(this.email, this.password),
        await this.#router.navigate(['/home']),
      ])
    } catch (err) {
      console.warn('[log-in.component.onSubmit] Error signing in', err)
      const errorToast = await this.#toastController.create(DEFAULT_ERROR);
      await errorToast.present();
    }
  }
}
