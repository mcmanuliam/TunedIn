import {NgModule} from '@angular/core';
import type {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {AllowIfNotProfileSetup} from '../../guards/profile-setup.guard';
import {AllowIfNotUser, AllowIfUser} from '../../guards/user.guard';
import {LandingPage} from './landing/landing.page';
import {ProfileSetupPage} from './profile-setup/profile-setup.page';
import {SigninPage} from './sign-in/sign-in.page';
import {SignupPage} from './sign-up/sign-up.page';

const routes: Routes = [
  {
    canActivate: [AllowIfNotUser],
    component: LandingPage,
    path: 'landing',
  },
  {
    canActivate: [AllowIfNotUser],
    component: SigninPage,
    path: 'sign-in',
  },
  {
    canActivate: [AllowIfNotUser],
    component: SignupPage,
    path: 'sign-up',
  },
  {
    canActivate: [AllowIfUser, AllowIfNotProfileSetup],
    component: ProfileSetupPage,
    path: 'profile-setup',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/landing',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/auth/landing',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
