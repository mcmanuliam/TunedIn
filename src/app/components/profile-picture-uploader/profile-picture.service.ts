import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilePictureService {
  readonly #profilePictureUrl = new BehaviorSubject<string | null>(null);

  public profilePictureUrl$ = this.#profilePictureUrl.asObservable();

  public updateProfilePicture(url: string) {
    this.#profilePictureUrl.next(url);
  }
}
