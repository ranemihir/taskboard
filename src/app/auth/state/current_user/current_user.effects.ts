import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CurrentUserActions from './current_user.actions';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import { CurrentUserService } from "./current_user.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { CurrentUser, ProjectRole } from "src/app/shared/types";


@Injectable({
    providedIn: 'root'
})
export class CurrentUserEffects {
    constructor(
        private $actions: Actions,
        private currentUserService: CurrentUserService,
        private router: Router
    ) {

    }

    loginUser$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(CurrentUserActions.login),
            exhaustMap(action => this.currentUserService.login(action.email, action.password).pipe(
                map((data: CurrentUser) => {
                    this.router.navigate(['/617ce5f9fc13ae5fcf00007d']);
                    return CurrentUserActions.login_Success({ data });
                }),
                catchError(error => {
                    console.error(error);
                    return of(CurrentUserActions.login_Failure({ error }));
                })
            ))
        );
    });

    signUpUser$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(CurrentUserActions.signUp),
            exhaustMap(action => this.currentUserService.signUp(action.firstName, action.lastName, action.email, action.password).pipe(
                map((data: CurrentUser) => {
                    this.router.navigate(['/']);
                    return CurrentUserActions.signUp_Success({ data });
                }),
                catchError(error => of(CurrentUserActions.signUp_Failure({ error })))
            ))
        );
    });

    acceptProjectRoleInvitation$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(CurrentUserActions.acceptProjectRoleInvitation),
            mergeMap(action => this.currentUserService.acceptProjectRoleInvitation(action.projectId).pipe(
                map((projectRole: ProjectRole) => {
                    return CurrentUserActions.acceptProjectRoleInvitation_Success({ projectRole });
                }),
                catchError(error => {
                    console.error(error);
                    return of(CurrentUserActions.acceptProjectRoleInvitation_Failure({ error }));
                })
            ))
        );
    });

}