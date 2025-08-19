import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { debounceTime, fromEvent} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {ProfileCardComponent} from '../../ui/profile-card/profile-card.component';
import { selectFilteredProfiles } from '../../data/store/selectors';
import {InfiniteScrollTriggerComponent} from '@tt/common-ui';
import {profileActions} from '@tt/profile';



@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent, InfiniteScrollTriggerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles)
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  destroy = inject(DestroyRef);
  console = console


  constructor() {}

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
    fromEvent(window, 'resize')
      .pipe(debounceTime(50), takeUntilDestroyed(this.destroy))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
