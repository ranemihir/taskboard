import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import AppState from '../shared/types/app.state';
import { CurrentUser } from '../shared/types/user';
import * as UserSelectors from './state/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(UserSelectors.getCurrentUser).pipe(map(
      (currentUser: CurrentUser | null): boolean => {
        if (currentUser && currentUser != null) {
          return false;
        }

        return true;
      })
    );
  }

}
