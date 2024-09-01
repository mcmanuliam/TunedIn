import {Injectable} from '@angular/core';
import type {UrlTree} from '@angular/router';
import type {userProfile} from 'src/models/user';
import {AbstractAuthGuard} from './abstract-auth.guard';

// Continue to route if User exists, else redirect to login.
@Injectable({providedIn: 'root'})
export class NonAuthGuard extends AbstractAuthGuard {
  protected redirectUrl(user: userProfile | null): UrlTree | true {
    return user ? true : this.router.createUrlTree(['/auth']);
  }
}
