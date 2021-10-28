import { createReducer, on } from "@ngrx/store";
import { CurrentUserState } from "src/app/shared/state";
import * as CurrentUserActions from './current_user.actions';

const initialState: CurrentUserState = {
    data: null,
    error: null
};

export const currentUserReducer = createReducer<CurrentUserState>(
    initialState as CurrentUserState,
    on(CurrentUserActions.loginUserSuccess, (state, action): CurrentUserState => {
        return {
            data: action.data,
            error: null
        };
    }),
    on(CurrentUserActions.loginUserFailure, (state, action): CurrentUserState => {
        return {
            data: null,
            error: action.error
        };
    }),
    on(CurrentUserActions.signUpUserSuccess, (state, action): CurrentUserState => {
        return {
            data: action.data,
            error: null
        };
    }),
    on(CurrentUserActions.signUpUserFailure, (state, action): CurrentUserState => {
        return {
            data: null,
            error: action.error
        };
    })
);