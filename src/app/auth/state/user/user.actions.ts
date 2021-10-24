import { createAction, props } from "@ngrx/store";
import { CurrentUser } from "src/app/shared/types/user";

export const loginUser = createAction(
    '[User] Set User Data on Login',
    props<{ email: string, password: string; }>()
);

export const loginUserSuccess = createAction(
    '[User] Login Successful',
    props<{ currentUser: CurrentUser; }>()
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
    '[User] Set User Data on Sign Up',
    props<{ currentUser: CurrentUser; }>()
);

export const signUpUserFailure = createAction(
    '[User] Set User Data on Sign Up',
    props<{ error: string; }>()
);