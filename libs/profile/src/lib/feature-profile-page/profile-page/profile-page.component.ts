import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import {switchMap} from 'rxjs';
import { SvgIconComponent } from 'libs/common-ui/src/lib/components/svg-icon/svg-icon.component';
import { ImgUrlPipe } from 'libs/common-ui/src/lib/pipes/img-url.pipe';
import {Store} from '@ngrx/store';
import { ProfileService } from 'libs/data-access/src/lib/profile/services/profile.service';
import {PostFeedComponent} from '@tt/posts';
import {ProfileHeaderComponent} from '../../ui/profile-header/profile-header.component';




@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store)
  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);
  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats','new'], { queryParams: {userId}});
  }
}
