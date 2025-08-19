import {createActionGroup, props} from '@ngrx/store';
import { Profile } from 'libs/data-access/src/lib/profile/interfaces/profile.interface';




export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'set page': props<{page?: number}>(),
    'profiles loaded' : props<{profiles: Profile[]}>()
  }
})
