import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {postsActions} from './actions';
import {map, switchMap, tap} from 'rxjs';
import { PostService } from 'libs/data-access/src/lib/posts/services/post.sevice';




@Injectable({
  providedIn: 'root'
})
export class PostEffects {
  postService = inject(PostService);
  actions$= inject(Actions);

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchPosts),
      switchMap(
        () =>
          this.postService
            .fetchPosts()
            .pipe(map((posts) => postsActions.postsLoaded({ posts })))
      )
    )
  })

  fetchPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchPosts),
      switchMap(() =>
        this.postService.fetchPosts()
          .pipe(
            map(posts => postsActions.postsLoaded({posts}))
          )
      ),
    )
  })




  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap(({payload}) =>
        this.postService
          .createPost({
            title: payload.title,
            content: payload.content,
            authorId: payload.authorId
          })
          .pipe(
            map(post => postsActions.fetchPosts({})),
          )
      ))
  })

  fetchComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchComments),
      switchMap(
        ({postId}) =>
        this.postService
          .getCommentsByPostId(postId)
          .pipe(
            map((comments) => postsActions.commentsLoaded({comments})),
            tap(()=> console.log(postId))
          )
      )
    )
  })


  createComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createComment),
      switchMap(({payload}) =>
        this.postService
          .createComment({
            text: payload.text,
            authorId: payload.authorId,
            postId: payload.postId,
          })
          .pipe(
            map(() => postsActions.fetchComments({ postId: payload.postId})) ,
            tap(()=> console.log(payload.postId))
          )
      ))
  })


}
