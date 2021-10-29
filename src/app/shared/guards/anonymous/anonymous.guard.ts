import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../../state';
import * as CurrentUserSelectors from 'src/app/auth/state/current_user/current_user.selectors';
import { CurrentUser } from '../../types';


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
    return this.store.select(CurrentUserSelectors.get).pipe(map(
      (currentUser: CurrentUser | null): boolean => {
        if (currentUser && currentUser != null) {
          return false;
        }

        return true;
      })
    );
  }

}
