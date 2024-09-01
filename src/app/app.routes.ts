import type {Routes} from '@angular/router';
import {NonAuthGuard} from 'src/guards/non-auth.guard';
import {AuthGuard} from '../guards/auth.guard';
import {AuthPage} from './auth/auth.page';
import {HomePage} from './home/home.page';

export const routes: Routes = [
  {
    canActivate: [NonAuthGuard],
    component: HomePage,
    path: 'home',
  },
  {
    canActivate: [AuthGuard],
    component: AuthPage,
    path: 'auth',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
];
