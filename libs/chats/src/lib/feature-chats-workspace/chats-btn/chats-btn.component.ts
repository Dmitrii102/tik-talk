import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { LastMessageRes } from 'libs/data-access/src/lib/chats/interfaces/chats.interface';


@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
