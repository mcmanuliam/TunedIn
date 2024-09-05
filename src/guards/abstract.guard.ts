import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import type {CanActivate, UrlTree} from '@angular/router';
import type {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import type {userProfile} from 'src/models/user';
import {UserService} from '../services/user.service';

/**
 * Abstract Guard
 * Allows us to easily extend and handle routing guards based on the app state
 * @function canActivate Redirects based on the redirectUrl and the app state
 */
@Injectable({providedIn: 'root'})
export abstract class AbstractGuard implements CanActivate {
  protected readonly userSvc = inject(UserService);

  protected readonly router = inject(Router);

  protected abstract redirectUrl(user: userProfile | null): UrlTree | true;

  public canActivate(): Observable<true | UrlTree> {
    return this.userSvc.user$.pipe(
      map(user => this.redirectUrl(user))
    );
  }
}
