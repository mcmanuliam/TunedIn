import {CommonModule} from '@angular/common';
import {HttpStatusCode} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {IonInput, IonLabel, IonItem, IonButton, IonInputPasswordToggle} from '@ionic/angular/standalone';
import {AuthService} from '../../../services/auth.service';
import {LogService} from '../../../services/log.service';
import {ToastService} from '../../../services/toast.service';
import {ErrorMessages} from '../../../util/error-message.enum';
import {AbstractAuthPage} from '../abstract.auth.page';
import type {AbstractFormComponent} from '../abstract.form.component';

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
  readonly #authSvc = inject(AuthService);

  readonly #router = inject(Router);

  readonly #toast = inject(ToastService);

  public readonly heading = 'Get Started.';

  public readonly description = 'Sign up to start capturing the world.';

  public busy = false;

  public value = {
    confPassword: '',

    email: '',

    password: '',
  }

  public async navToSignIn(): Promise<void> {
    try {
      await this.#router.navigate(['/auth/sign-in'], {replaceUrl: true})
    } catch (error) {
      LogService.warn('Failed to navigate:', 'sign-in.component.navToSignIn', error);
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
        await this.#router.navigate(['/profile-setup']),
      ])
    } catch (error: any) {
      this.busy = false
      if (error.status === HttpStatusCode.UnprocessableEntity) {
        const errorToast = await this.#toast.showWarning(ErrorMessages.EMAIL_TAKEN);
        await errorToast.present();
        return;
      }
      LogService.error('Error signing in:', 'sign-in.component.onSubmit', error);
      const errorToast = await this.#toast.showWarning(ErrorMessages.DEFAULT_SIGN_UP);
      await errorToast.present();
    }
  }
}
