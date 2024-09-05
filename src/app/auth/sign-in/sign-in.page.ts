import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {IonInput, IonLabel, IonItem, IonButton, IonInputPasswordToggle} from '@ionic/angular/standalone';
import {AuthService} from '../../../services/auth.service';
import {LogService} from '../../../services/log.service';
import {ToastService} from '../../../services/toast.service';
import {AbstractAuthPage} from '../abstract.auth.page';
import type {AbstractFormComponent} from '../abstract.form.component';
import {ErrorMessages} from './../../../util/error-message.enum';

interface IValue {
  email: string,

  password: string,
}

@Component({
  imports: [
    CommonModule,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    FormsModule,
    AbstractAuthPage,
    IonInputPasswordToggle
  ],
  standalone: true,
  styleUrls: ['../abstract.auth.page.scss'],
  templateUrl: './sign-in.page.pug',
})
export class SigninPage implements AbstractFormComponent<IValue> {
  readonly #authSvc = inject(AuthService);

  readonly #router = inject(Router);

  readonly #toast = inject(ToastService);

  public readonly heading = 'Welcome Back.';

  public readonly description = 'Sign in to continue capturing the world.';

  public busy = false;

  public value = {
    email: '',

    password: '',
  }

  public async navToSignUp(): Promise<void> {
    try {
      await this.#router.navigate(['/auth/sign-up'], {replaceUrl: true})
    } catch (error) {
      LogService.warn('Failed to navigate:', 'sign-in.component.navToSignIn', error);
    }
  }

  public async onSubmit() {
    this.busy = true;
    try {
      await Promise.all([
        await this.#authSvc.signIn(this.value.email, this.value.password),
        await this.#router.navigate(['/tabs'], {replaceUrl: true}),
      ])
      this.busy = false;
    } catch (error) {
      this.busy = false;
      const toast = await this.#toast.showWarning(ErrorMessages.DEFAULT_SIGN_IN)
      await toast.present();
      LogService.warn('Error signing in:', 'sign-in.component.onSubmit', error);
    }
  }
}