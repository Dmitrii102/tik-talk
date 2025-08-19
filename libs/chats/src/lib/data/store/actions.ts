import {createActionGroup, props} from '@ngrx/store';
import {LastMessageRes} from '@tt/data-access';

export const chatActions = createActionGroup({
  source: 'chat',
  events: {
    'chat loaded': props<{chats: LastMessageRes[]}>(),
    'fetch chats': props<{page?: number}>(),
  }
})
