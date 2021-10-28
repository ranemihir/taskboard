import { createReducer, on } from "@ngrx/store";
import AppState from "src/app/shared/state";

const initialState: AppState = {
    currentUser: null,
    error: null
};

export const userReducer = createReducer<AppState>(
    initialState as AppState,
    on(UserActions.loginUserSuccess, (state, action): AppState => {
        return {
            ...state,
            currentUser: action.currentUser,
            error: null
        };
    }),
    on(UserActions.loginUserFailure, (state, action): AppState => {
        return {
            ...state,
            currentUser: null,
            error: action.error
        };
    }),
    on(UserActions.signUpUserSuccess, (state, action): AppState => {
        return {
            ...state,
            currentUser: action.currentUser,
            error: null
        };
    }),
    on(UserActions.signUpUserFailure, (state, action): AppState => {
        return {
            ...state,
            currentUser: null,
            error: action.error
        };
    })
);