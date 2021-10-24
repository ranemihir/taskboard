import { createAction, props } from "@ngrx/store";

export const loginUser = createAction(
    '[User] Set User Data on Login',
    props<{ email: string, password: string; }>()
);

export const loginUserSuccess = createAction(
    '[User] Login Successful',
    props<{}>
);

export const loginUserFailure = createAction(
    '[User] Login Failure'
);

export const signUpUser = createAction(
    '[User] Set User Data on Sign Up',
    props<{ firstName: string, lastName: string, email: string, password: string; }>()
);