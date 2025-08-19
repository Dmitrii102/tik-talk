import {ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {firstValueFrom, Subscription} from 'rxjs';
import {SvgIconComponent} from 'libs/common-ui/src/lib/components/svg-icon/svg-icon.component';
import {ImgUrlPipe} from 'libs/common-ui/src/lib/pipes/img-url.pipe';
import {AuthService, ChatsService, ProfileService} from '@tt/data-access';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {isErrorMessage} from '../../../../data-access/src/lib/chats/interfaces/type-guards';


@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  destroyRef = inject(DestroyRef);
  authService = inject(AuthService);
  me = this.profileService.me;
  wsSubscribe!: Subscription;

  subscribers$ = this.profileService.getSubscribersShortList();


  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];


  async reconnect() {
    await firstValueFrom(this.authService.refreshAuthToken())
    this.connectWs()
  }

  connectWs() {
    this.wsSubscribe?.unsubscribe();
    this.wsSubscribe = this.chatsService
      .connectWs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(message => {
        if (isErrorMessage(message)) {
          this.reconnect();
        }
      });
  }


  constructor() {
    firstValueFrom(this.profileService.getMe())
  }

  ngOnInit() {
    this.connectWs()
  }


}

