import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserState } from '../shared/state';
import { CurrentUser } from '../shared/types';
import * as CurrentUserSelectors from './state/current_user/current_user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<CurrentUserState>,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(CurrentUserSelectors.getCurrentUser).pipe(map(
      (currentUser: CurrentUser | null): boolean => {
        if (currentUser == null) {
          return true;
        }

        this.router.navigateByUrl('/login');
        return false;
      })
    );
  }

}
