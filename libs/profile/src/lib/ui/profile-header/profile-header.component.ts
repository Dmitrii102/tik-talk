import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { Profile } from 'libs/data-access/src/lib/profile/interfaces/profile.interface';



@Component({
  selector: 'app-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
