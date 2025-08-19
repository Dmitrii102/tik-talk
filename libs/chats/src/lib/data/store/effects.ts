import {inject, Injectable} from '@angular/core';
import {ChatsService} from '@tt/data-access';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs';
import {chatActions} from './actions';

@Injectable({
  providedIn: 'root'
})
export class ChatEffects {
  chatsService = inject(ChatsService);
  actions$ = inject(Actions);

  loadChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatActions.fetchChats),
      switchMap(
        () =>
          this.chatsService
            .getMyChats()
            .pipe(
              map((chats) => chatActions.chatLoaded({chats}))
            )
      )
    )
  })


}
