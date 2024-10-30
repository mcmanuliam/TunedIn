import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilePictureService {
  public profilePictureUrl$;

  readonly #profilePictureUrl = new BehaviorSubject<string | null>(null);

  public constructor() {
    this.profilePictureUrl$ = this.#profilePictureUrl.asObservable();
  }

  public updateProfilePicture(url: string): void {
    this.#profilePictureUrl.next(url);
  }
}
