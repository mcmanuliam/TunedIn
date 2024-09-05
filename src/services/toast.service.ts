import {inject, Injectable} from "@angular/core";
import type {ToastOptions} from '@ionic/angular';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly #toast = inject(ToastController);

  public async showToast(
    message: string,
    options?: Partial<ToastOptions>
  ): Promise<HTMLIonToastElement> {
    const defaultOptions: ToastOptions = {
      duration: 3000,
      message,
      position: 'bottom',
      translucent: true,
    };

    const toastOptions = {...defaultOptions, ...options};
    const toast = await this.#toast.create(toastOptions);
    return toast;
  }

  public async showWarning(message: string, options?: Partial<ToastOptions>): Promise<HTMLIonToastElement> {
    return this.showToast(message, {
      icon: 'warning',
      ...options,
    });
  }

  public async showInfo(message: string, options?: Partial<ToastOptions>): Promise<HTMLIonToastElement> {
    return this.showToast(message, {
      icon: 'help-circle',
      ...options,
    });
  }
}