import type {Routes} from '@angular/router';
import {AllowIfProfileSetup} from '../guards/profile-setup.guard';
import {AllowIfUser} from '../guards/user.guard';
import {FeedPage} from './feed/feed.page';
import {SearchComponent} from './search/search.page';
import {TabsPage} from './tabs/tabs.page';

export const routes: Routes = [
  {
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
    path: 'auth',
  },
  {
    canActivate: [AllowIfUser, AllowIfProfileSetup],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        component: FeedPage,
        path: 'home',
      },
      {
        component: SearchComponent,
        path: 'search',
      },
      {
        loadChildren: () => import('./profile/profile-routing.module').then(m => m.ProfileRoutingModule),
        path: 'profile',
      },
    ],
    component: TabsPage,
    path: 'tabs',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/sign-in',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/auth/sign-in',
  },
];
