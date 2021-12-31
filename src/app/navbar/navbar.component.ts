import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from '../shared/state';
import { CurrentUser } from '../shared/types';
import * as CurrentUserSelectors from '../auth/state/current_user/current_user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<CurrentUser>;
  avatarUrl: string = environment.avatarUrl;


  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.store.select(CurrentUserSelectors.get);
  }

}
