
import {createFeature, createReducer, on} from '@ngrx/store';
import {postsActions} from './actions';
import {Post, PostComment} from 'libs/data-access/src/lib/posts/interfaces/post.interface';



export interface PostState {
  posts: Post[],
  comments: Record<number, PostComment[]>
}

export const initialState: PostState = {
  posts: [],
  comments: {}
}

export const postFeature = createFeature({
  name: 'Post',
  reducer: createReducer(
    initialState,

    on(postsActions.postsLoaded,(state, {posts}) => ({
      ...state,
      posts
    })),

    on(postsActions.commentsLoaded,(state: PostState, {comments}) => {
      const stateComments = {...state.comments}

      if (comments.length) {
        stateComments[comments[0].postId] = comments
      }

      return {
        ...state,
        comments: stateComments
      }
    })
  )
})
