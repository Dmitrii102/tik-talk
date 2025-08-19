import {ChangeDetectionStrategy, Component, inject, OnInit, Signal} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { ChatsService } from 'libs/data-access/src/lib/chats/services/chats.service';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import {Store} from '@ngrx/store';
import {postsActions, selectComments} from '@tt/posts';
import {selectChats} from '../../data/store/selectors';
import {chatActions} from '../../data/store/actions';
import {LastMessageRes, PostComment} from '@tt/data-access';




@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChatsListComponent implements OnInit {
  chatService = inject(ChatsService);
  store = inject(Store);
  chat$ = this.store.select(selectChats);

  filterChatsControl = new FormControl('');

  ngOnInit () {
    this.store.dispatch(chatActions.fetchChats({}));


  }

  // chats$ = this.chatService.getMyChats().pipe(
  //   switchMap((chats) => {
  //     return this.filterChatsControl.valueChanges.pipe(
  //       startWith(''),
  //       map((inputValue) => {
  //         return chats.filter((chat) => {
  //           return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
  //             .toLowerCase()
  //             .includes(inputValue?.toLowerCase() ?? '');
  //         });
  //       })
  //     );
  //   })
  // );
}
