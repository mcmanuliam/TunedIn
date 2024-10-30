import {CommonModule} from '@angular/common';
import {HttpStatusCode} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {IonInput, IonLabel, IonItem, IonButton, IonInputPasswordToggle} from '@ionic/angular/standalone';
import {spotifyConfig} from '../../../config/providers/spotify';
import {AuthService} from '../../../services/auth.service';
import {LogService} from '../../../services/log.service';
import {ToastService} from '../../../services/toast.service';
import {ErrorMessages} from '../../../util/enums/error-message.enum';
import type {AbstractFormComponent} from '../../components/abstract.form.component';
import {AbstractAuthPage} from '../abstract.auth.page';

interface IValue {
  email: string,

  password: string,

  confPassword: string,
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
  templateUrl: './sign-up.page.pug',
})
export class SignupPage implements AbstractFormComponent<IValue> {
  public readonly heading = 'Get Started.';

  public readonly description = 'Sign up to start capturing the world.';

  public busy = false;

  public spotifyConf = spotifyConfig;

  public value = {
    confPassword: '',

    email: '',

    password: '',
  }

  readonly #authSvc = inject(AuthService);

  readonly #router = inject(Router);

  readonly #toast = inject(ToastService);

  public async navToSignIn(): Promise<void> {
    try {
      await this.#router.navigate(['/auth/sign-in'], {replaceUrl: true})
    } catch (error) {
      LogService.warn('Failed to navigate', 'sign-up.component.navToSignIn', error);
    }
  }

  public async navToLanding(): Promise<void> {
    try {
      await this.#router.navigate(['/auth/landing'], {replaceUrl: true})
    } catch (error) {
      LogService.warn('Failed to navigate', 'sign-up.component.navToLanding', error);
    }
  }


  public async onSubmit(): Promise<void> {
    this.busy = true;
    if (this.value.password !== this.value.confPassword) {
      this.busy = false;
      const errorToast = await this.#toast.showWarning(ErrorMessages.PASSWORDS_DONT_MATCH);
      await errorToast.present();
      return;
    }

    try {
      await Promise.all([
        await this.#authSvc.signUp(this.value.email, this.value.password),
        await this.#router.navigate(['/auth/profile-setup']),
      ])
    } catch (error: any) {
      this.busy = false
      if (error.status === HttpStatusCode.UnprocessableEntity) {
        const errorToast = await this.#toast.showWarning(ErrorMessages.EMAIL_TAKEN);
        await errorToast.present();
        return;
      }
      LogService.error('Error signing up', 'sign-up.component.onSubmit', error);
      const errorToast = await this.#toast.showWarning(ErrorMessages.DEFAULT_SIGN_UP);
      await errorToast.present();
    }
  }
}
