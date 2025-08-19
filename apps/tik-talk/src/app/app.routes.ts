import { Routes } from '@angular/router';
import {ProfileEffects, profileFeature, ProfilePageComponent} from '@tt/profile';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {canActivateAuth} from '@tt/auth';
import {LayoutComponent} from '@tt/layout';
import {PostEffects, postFeature} from '@tt/posts';
import {
  SearchPageComponent
} from '../../../../libs/profile/src/lib/feature-profile-list/search-page/search-page.component';
import {
  SettingsPageComponent
} from '../../../../libs/profile/src/lib/feature-profile-settings/settings-page/settings-page.component';
import {LoginPageComponent} from '../../../../libs/auth/src/lib/feature-login/login-page/login-page.component';
import {chatsRoutes} from '@tt/chats';
import {FormsExperimentComponent} from '../../../../libs/experimental/forms-experiment/src';







export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ]
      },

      { path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [
          provideState(postFeature),
          provideEffects(PostEffects),
        ]
      },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'experimental', component: FormsExperimentComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,

      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
