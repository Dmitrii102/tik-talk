import {LastMessageRes} from '@tt/data-access';
import {createFeature, createReducer, on} from '@ngrx/store';
import {chatActions} from './actions';

export interface ChatState {
  chats: LastMessageRes[];

}

export const initialState: ChatState = {
  chats: [],
}

export const chatFeature = createFeature({
  name: 'Chat',
  reducer: createReducer(
    initialState,

    on(chatActions.chatLoaded,(state, {chats}) => ({
      ...state,
      chats
    })),

  )
})
