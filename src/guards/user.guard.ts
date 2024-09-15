import {Injectable} from '@angular/core';
import type {UrlTree} from '@angular/router';
import type {IUserProfile} from '../models/user';
import {AbstractGuard} from './abstract.guard';

// Continue to route if User doesn't exists, else redirect to home.
@Injectable({providedIn: 'root'})
export class AllowIfNotUser extends AbstractGuard {
  protected redirectUrl(user: IUserProfile | null): UrlTree | true {
    return user ? this.router.createUrlTree(['/tabs']) : true;
  }
}

// Continue to route if User exists, else redirect to sign-in.
@Injectable({providedIn: 'root'})
export class AllowIfUser extends AbstractGuard {
  protected redirectUrl(user: IUserProfile | null): UrlTree | true {
    return user ? true : this.router.createUrlTree(['/auth/sign-in']);
  }
}
