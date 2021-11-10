import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/state';
import * as UserSelectors from './auth/state/current_user/current_user.selectors';
import * as ProjectsActions from './taskboard/state/projects/projects.actions';
import * as ProjectsSelectors from './taskboard/state/projects/projects.selectors';
import { Observable } from 'rxjs';
import { CurrentUser, Project } from './shared/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser$: Observable<CurrentUser>;
  avatarUrl: string = environment.avatarUrl;

  constructor(
    private store: Store<AppState>
  ) {
    this.currentUser$ = this.store.select(UserSelectors.get);
  }


};
