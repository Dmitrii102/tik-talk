import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { PostComment } from 'libs/data-access/src/lib/posts/interfaces/post.interface';
import {DatePipe} from '../../../../../common-ui/src/lib/pipes/date.pipe';




@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent,
    DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CommentComponent {
  comment = input<PostComment>();
}
