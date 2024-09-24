import {NgModule} from '@angular/core';
import type {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {AllowIfProfileSetup} from '../../guards/profile-setup.guard';
import {AllowIfUser} from '../../guards/user.guard';
import {ProfilePage} from './profile.page';
import {SettingsPage} from './settings/settings.page';

const routes: Routes = [
  {
    canActivate: [AllowIfUser, AllowIfProfileSetup],
    component: ProfilePage,
    path: '',
  },
  {
    canActivate: [AllowIfUser, AllowIfProfileSetup],
    component: SettingsPage,
    path: 'settings',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ProfileRoutingModule {}
