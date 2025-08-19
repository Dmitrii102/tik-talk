import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatsService } from 'libs/data-access/src/lib/chats/services/chats.service';
import { Chat } from 'libs/data-access/src/lib/chats/interfaces/chats.interface';
import { MessageInputComponent } from 'libs/chats/src/lib/ui/message-input/message-input.component';


@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessagesComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);
  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  destroy = inject(DestroyRef);

  async onSendMessage(messageText: string) {
    this.chatsService.wsAdapter.sendMessage(
      messageText,
      this.chat().id
    )
    // await firstValueFrom(
      // this.chatsService.sendMessage(this.chat().id, messageText)
    // );
    await firstValueFrom(this.chatsService.getChatById(this.chat().id))

  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  ngAfterViewInit() {
    this.resizeFeed();
    fromEvent(window, 'resize')
      .pipe(debounceTime(50), takeUntilDestroyed(this.destroy))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 28;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
