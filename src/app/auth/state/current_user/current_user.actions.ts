import { createAction, props } from "@ngrx/store";
import { CurrentUser } from "src/app/shared/types";

export const loginUser = createAction(
    '[User] Set User Data on Login',
    props<{ email: string, password: string; }>()
);

export const loginUserSuccess = createAction(
    '[User] Login Successful',
    props<{ data: CurrentUser; }>()
);

export const loginUserFailure = createAction(
    '[User] Login Failure',
    props<{ error: string; }>()
);

export const signUpUser = createAction(
    '[User] Set User Data on Sign Up',
    props<{ firstName: string, lastName: string, email: string, password: string; }>()
);

export const signUpUserSuccess = createAction(
    '[User] Sign Up Successful',
    props<{ data: CurrentUser; }>()
);

export const signUpUserFailure = createAction(
    '[User] Sign Up Failure',
    props<{ error: string; }>()
);

export const getCurrentUserIfExists = createAction(
    '[User] Get Current User If Exists'
);