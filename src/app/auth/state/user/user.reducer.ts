import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.actions';

export interface UserState {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    accessToken: string | null;
}

const initialState: UserState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    accessToken: null
};

export const userReducer = createReducer<UserState>(
    initialState as UserState,
    on(UserActions.loginUser, (state, action): UserState => action.user),
    on(UserActions.signUpUser, (state, action): UserState => action.user)
);