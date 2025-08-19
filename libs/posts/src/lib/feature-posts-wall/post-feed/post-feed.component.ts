import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject, input,
  Renderer2,
} from '@angular/core';

import { debounceTime, fromEvent} from 'rxjs';
import { NgForOf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';


import { selectPosts } from '../../data/store/selectors';
import { postsActions } from '../../data/store/actions';
import { Post } from 'libs/data-access/src/lib/posts/interfaces/post.interface';
import { ProfileService } from 'libs/data-access/src/lib/profile/services/profile.service';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';



@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent, NgForOf],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements AfterViewInit {
  posts = input<Post[] | null>();
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  profile = inject(ProfileService).me;
  store = inject(Store)
  feed = this.store.selectSignal(selectPosts)
  destroy = inject(DestroyRef);

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }


  constructor() {
    this.store.dispatch(postsActions.fetchPosts({}));
    console.log(this.feed());
  }

  ngAfterViewInit() {
    this.resizeFeed();
    fromEvent(window, 'resize')
      .pipe(debounceTime(50), takeUntilDestroyed(this.destroy))
      .subscribe(() => {
        this.resizeFeed();
        console.log(123);
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }



  onCreatePost(postText: string) {
    if (!postText) return;

    this.store.dispatch(postsActions.createPost({
      payload: {
       title: 'Клевый пост',
       content: postText,
       authorId: this.profile()!.id,
      }
     })
    )}

}
