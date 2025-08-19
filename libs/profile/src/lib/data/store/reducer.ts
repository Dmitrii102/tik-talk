
import {createFeature, createReducer, on} from '@ngrx/store';
import {profileActions} from './actions';
import { Profile } from 'libs/data-access/src/lib/profile/interfaces/profile.interface';



export interface ProfileState {
  profiles: Profile[],
  profileFilters: Record<string, any>,
  page: number,
  size: number;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  page: 1,
  size: 10
}

export const profileFeature = createFeature({
  name:'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state: ProfileState, payload) => {
       return {
         ...state,
         profiles: state.profiles.concat(payload.profiles)
       }
    }),
    on(profileActions.filterEvents, (state: ProfileState, payload) => {
      return {
        ...state,
        profiles: [],
        profileFilters: payload.filters,
        page: 1
      }
    }),
    on(profileActions.setPage, (state: ProfileState, payload) => {
      let page = payload.page;
      if (!page) page = state.page + 1
      return {
        ...state,
        page
      }
    })
  )
})
