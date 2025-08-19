import {
  Component,
  ElementRef,
  HostBinding,
  input,
  ViewChild,
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { Message } from 'libs/data-access/src/lib/chats/interfaces/chats.interface';


@Component({
  selector: 'app-chat-workspace-messages',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss',
})
export class ChatWorkspaceMessagesComponent {
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngOnChanges() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }
}
