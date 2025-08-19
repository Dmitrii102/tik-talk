import { Route } from '@angular/router';
import { ChatWorkspaceComponent } from '../chats/chat-workspace/chat-workspace.component';
import { ChatsPageComponent } from './chats.component';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {chatFeature} from '../../data/store/reducer';
import {ChatEffects} from '../../data/store/effects';




export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    providers: [
      provideState(chatFeature),
      provideEffects(ChatEffects),
    ],
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
