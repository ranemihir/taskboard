import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { exhaustMap } from 'rxjs/operators';
import { AuthService } from "../../auth.service";


@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(
        private $actions: Actions,
        private authService: AuthService
    ) { }

    loginUser = createEffect(() => this.$actions.pipe(
        ofType(UserActions.loginUser),
        exhaustMap(action => this.authService.login(action.email, action.password))
    ));

    singUpUser = createEffect(() => this.$actions.pipe(
        ofType(UserActions.signUpUser),
        exhaustMap(action => this.authService.signUp(action.firstName, action.lastName, action.email, action.password))
    ));
}