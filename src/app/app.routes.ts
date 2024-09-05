import type {Routes} from '@angular/router';
import {AllowIfProfileSetup} from '../guards/profile-setup.guard';
import {AllowIfUser} from '../guards/user.guard';
import {TabsPage} from './tabs/tabs.page';

export const routes: Routes = [
  {
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
    path: 'auth',
  },
  {
    canActivate: [AllowIfUser, AllowIfProfileSetup],
    component: TabsPage,
    path: 'tabs',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/sign-in',
  },
];
