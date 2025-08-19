import {ChangeDetectionStrategy, Component, computed, inject, input, OnInit, Signal} from '@angular/core';
import {DatePipe} from '../../../../../common-ui/src/lib/pipes/date.pipe';
import {Store} from '@ngrx/store';
import {Post, PostComment} from 'libs/data-access/src/lib/posts/interfaces/post.interface';
import { GlobalStoreService } from 'libs/data-access/src/lib/common/services/global-store.service';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from 'libs/common-ui/src/lib/components/svg-icon/svg-icon.component';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { CommentComponent } from '../../ui/comment/comment.component';
import { postsActions } from '../../data/store/actions';
import { selectComments } from '../../data/store/selectors';


@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DatePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  post = input<Post>();
  profile = inject(GlobalStoreService).me;
  comments! : Signal<PostComment[]>
  store = inject(Store)


  comments2 = computed(() => {
    if (this.comments()?.length > 0) {
      return this.comments()
    }
    return this.post()?.comments
  })




  ngOnInit() {

    this.comments = this.store.selectSignal(selectComments(this.post()!.id))

  }

  onCreated(commentText: string) {
    if (!commentText) return

    this.store.dispatch(
      postsActions.createComment({
        payload: {
          text: commentText,
          authorId: this.profile()!.id,
          postId: this.post()!.id,
        }
      })
    )
  }

  // async ngOnInit() {
  //   this.comments.set(this.post()!.comments);
  // }

  // async onCreated(commentText: string) {
  //   firstValueFrom(
  //     this.postService.createComment({
  //       text: commentText,
  //       authorId: this.profile()!.id,
  //       postId: this.post()!.id,
  //     })
  //   )
  //     .then(async () => {
  //       const comments = await firstValueFrom(
  //         this.postService.getCommentsByPostId(this.post()!.id)
  //       );
  //       this.comments.set(comments);
  //     })
  //     .catch((error) => console.error('Error creating comment', error));
  //   return;
  // }
}


