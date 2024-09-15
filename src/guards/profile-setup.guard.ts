import {Injectable} from '@angular/core';
import type {UrlTree} from '@angular/router';
import type {IUserProfile} from '../models/user';
import {AbstractGuard} from './abstract.guard';

// Continue to route if User hasn't setup-profile, else redirect to home
@Injectable({providedIn: 'root'})
export class AllowIfNotProfileSetup extends AbstractGuard {
  protected redirectUrl(user: IUserProfile | null): UrlTree | true {
    return user?.profile_setup ? this.router.createUrlTree(['/tabs']) : true;
  }
}

// Continue to route if User has setup-profile, else redirect to profile-setup.
@Injectable({providedIn: 'root'})
export class AllowIfProfileSetup extends AbstractGuard {
  protected redirectUrl(user: IUserProfile | null): UrlTree | true {
    return user?.profile_setup ? true : this.router.createUrlTree(['/auth/profile-setup']);
  }
}
