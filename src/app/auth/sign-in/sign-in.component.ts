import {CommonModule} from '@angular/common';
import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import type {ToastOptions} from '@ionic/angular';
import {ToastController} from '@ionic/angular';
import {IonTitle, IonInput, IonLabel, IonItem, IonButton} from '@ionic/angular/standalone';
import {AuthService} from 'src/services/auth.service';

const DEFAULT_ERROR: ToastOptions = {
  color: 'danger',
  message: 'Error signing in, please check your details and try again.',
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
  selector: 'app-sign-in',
  standalone: true,
  styleUrls: ['../auth.page.scss'],
  templateUrl: './sign-in.component.pug',
})
export class SigninComponent {
  @Output()
  public readonly swipe = new EventEmitter<'next' | 'prev'>();

  readonly #authSvc = inject(AuthService);

  readonly #router = inject(Router);

  readonly #toastController = inject(ToastController);

  public email: string = '';

  public password: string = '';

  public next(): void {
    this.swipe.emit('next')
  }

  public async onSubmit() {
    try {
      await Promise.all([
        await this.#authSvc.signIn(this.email, this.password),
        await this.#router.navigate(['/home']),
      ])
    } catch (err) {
      console.warn('[log-in.component.onSubmit] Error signing in', err)
      const errorToast = await this.#toastController.create(DEFAULT_ERROR);
      await errorToast.present();
    }
  }
}
