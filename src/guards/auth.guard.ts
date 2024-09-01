import {Injectable} from '@angular/core';
import type {UrlTree} from '@angular/router';
import type {userProfile} from 'src/models/user';
import {AbstractAuthGuard} from './abstract-auth.guard';

// Redirects home if User exists, else continue to route.
@Injectable({providedIn: 'root'})
export class AuthGuard extends AbstractAuthGuard {
  protected redirectUrl(user: userProfile | null): UrlTree | true {
    return user ? this.router.createUrlTree(['/home']) : true;
  }
}
