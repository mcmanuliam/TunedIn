import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {IonContent, IonHeader, IonToolbar, IonItem, IonList, IonTitle, IonBackButton, IonButtons} from '@ionic/angular/standalone';
import {AuthService} from 'src/services/auth.service';

@Component({
  imports: [
    IonContent,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonItem,
    IonList,
    IonTitle,
    IonBackButton
  ],
  standalone: true,
  templateUrl: './settings.page.pug'
})
export class SettingsPage {
  public readonly authSvc = inject(AuthService);

  readonly #router = inject(Router);

  public async quit(): Promise<void> {
    await Promise.all([
      await this.authSvc.signOut(),
      await this.#router.navigate(['/auth/sign-in'], {replaceUrl: true})
    ])
  }
}