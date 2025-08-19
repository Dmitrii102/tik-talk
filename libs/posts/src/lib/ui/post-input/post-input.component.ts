import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from 'libs/common-ui/src/lib/components/svg-icon/svg-icon.component';
import { GlobalStoreService } from 'libs/data-access/src/lib/common/services/global-store.service';




@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, NgIf, FormsModule, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInputComponent {
  r2 = inject(Renderer2);
  isCommentInput = input(false);
  postId = input<number>(0);
  profile = inject(GlobalStoreService).me;
  postText = '';

  @Output() created = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost(postText: string): void {
    if (!postText) return;

    this.postText = '';
    this.created.emit(postText);
  }


  onSend() {
    if (this.postText.trim()) {
      this.created.emit(this.postText);
      this.postText = '';
    }
  }

  onKeyUp() {
    this.onSend();
  }
}
