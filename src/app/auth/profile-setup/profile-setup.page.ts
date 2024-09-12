import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {IonInput, IonLabel, IonItem, IonButton, IonInputPasswordToggle} from '@ionic/angular/standalone';
import {LogService} from '../../../services/log.service';
import {UserService} from '../../../services/user.service';
import {AbstractAuthPage} from '../abstract.auth.page';
import type {AbstractFormComponent} from '../abstract.form.component';

interface IValue {
  displayName: string;
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
  templateUrl: './profile-setup.page.pug',
})
export class ProfileSetupPage implements AbstractFormComponent<IValue> {
  readonly #userSvc = inject(UserService);

  readonly #router = inject(Router);

  public readonly heading = 'Setup Your Profile.';

  public readonly description = 'Setup your profile to start capturing the world.';

  public busy = false;

  public value = {
    displayName: ''
  }

  public onSubmit(): void {
    this.busy = true;
    this.#userSvc.finialiseProfile({displayName: this.value.displayName})
      .then(() => {
        this.busy = false;
        return this.#router.navigate(['/tabs/home'], {replaceUrl: true})
      })
      .catch(error => {
        this.busy = false;
        LogService.error('Error signing in:', 'sign-in.component.onSubmit', error);
      })
  }
}
