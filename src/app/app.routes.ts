import type {Routes} from '@angular/router';

export const routes: Routes = [
  {
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    path: 'home',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
