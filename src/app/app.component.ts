import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/state';
import * as UserSelectors from './auth/state/current_user/current_user.selectors';
import * as ProjectsActions from './taskboard/state/projects/projects.actions';
import * as ProjectsSelectors from './taskboard/state/projects/projects.selectors';
import { Observable } from 'rxjs';
import { CurrentUser, Project } from './shared/types';
import { environment } from 'src/environments/environment';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser$: Observable<CurrentUser>;
  avatarUrl: string = environment.avatarUrl;
  loading = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.currentUser$ = this.store.select(UserSelectors.get);
  }

  showNavBar() {
    return this.router.url !== 'login' && this.router.url !== 'signup';
  }

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
        this.loading = false;
      }
    });
  }


};
