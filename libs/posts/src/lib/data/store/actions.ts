import {createActionGroup, props} from '@ngrx/store';
import {
  CommentCreateDto,
  Post,
  PostComment,
  PostCreateDto
} from 'libs/data-access/src/lib/posts/interfaces/post.interface';



export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'posts loaded' : props<{posts: Post[]}>(),
    'fetch posts': props<{page?: number}>(),
    'create post': props<{payload: PostCreateDto}>(),

    'comments loaded' : props<{comments: PostComment[]}>(),
    'fetch comments': props<{postId: number}>(),
    'create comment': props<{payload: CommentCreateDto}>(),
  }
})
