import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilePictureService {
  readonly #profilePictureUrlSubject = new BehaviorSubject<string | null>(null);

  public profilePictureUrl$ = this.#profilePictureUrlSubject.asObservable();

  public updateProfilePicture(url: string) {
    this.#profilePictureUrlSubject.next(url);
  }
}
