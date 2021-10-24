import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import { AuthService } from "../../auth.service";
import { of } from "rxjs";
import { CurrentUser } from "src/app/shared/types/user";


@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(
        private $actions: Actions,
        private authService: AuthService
    ) { }

    loginUser$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(UserActions.loginUser),
            mergeMap(action => this.authService.login(action.email, action.password).pipe(
                map((currentUser: CurrentUser) => UserActions.loginUserSuccess({ currentUser })),
                catchError(error => {
                    console.error(error);
                    return of(UserActions.loginUserFailure({ error }));
                })
            ))
        );
    });

    signUpUser$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(UserActions.signUpUser),
            exhaustMap(action => this.authService.signUp(action.firstName, action.lastName, action.email, action.password).pipe(
                map((currentUser: CurrentUser) => UserActions.signUpUserSuccess({ currentUser })),
                catchError(error => of(UserActions.signUpUserFailure({ error })))
            ))
        );
    });
}