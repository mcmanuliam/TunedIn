import type {OnChanges} from '@angular/core';
import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {IonIcon, IonButton, IonContent} from '@ionic/angular/standalone';
import {AuthService} from '../../../services/auth.service';

@Component({
  imports: [
    IonIcon,
    IonButton,
    IonContent,
  ],
  selector: 'app-landing',
  standalone: true,
  styleUrls: ['./landing.page.scss'],
  templateUrl: './landing.page.pug',
})
export class LandingPage implements OnChanges {
  #authSvc = inject(AuthService);

  #router = inject(Router);

  public busy = false;

  public async ngOnChanges(): Promise<void> {
    if (this.#router.url.includes('auth/callback')) {
      await this.#router.navigate(['/home'], {replaceUrl: true});
    }
  }

  public async signInWithSpotify(): Promise<void> {
    this.busy = true;
    await this.#authSvc.signInWithSpotify();
  }

  public async navSignIn(): Promise<void> {
    await this.#router.navigate(['/auth/sign-in'], {replaceUrl: true});
  }
}
