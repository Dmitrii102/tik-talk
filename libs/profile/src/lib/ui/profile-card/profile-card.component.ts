import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import { ImgUrlPipe } from 'libs/common-ui/src/lib/pipes/img-url.pipe';
import { Profile } from 'libs/data-access/src/lib/profile/interfaces/profile.interface';
import {Router} from '@angular/router';



@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  router = inject(Router);
  @Input() profile!: Profile;


  async sendMessage(userId: number) {
    this.router.navigate(['/chats','new'], { queryParams: {userId}});
  }
}
