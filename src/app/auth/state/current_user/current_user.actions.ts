import { createAction, props } from "@ngrx/store";
import { CurrentUser, ProjectRole } from "src/app/shared/types";

// login
export const login = createAction(
    '[Current User] Login',
    props<{ email: string, password: string; }>()
);

export const login_Success = createAction(
    '[Current User] Login (Successful)',
    props<{ data: CurrentUser; }>()
);

export const login_Failure = createAction(
    '[Current User] Login (Failure)',
    props<{ error: string; }>()
);


// sign up
export const signUp = createAction(
    '[Current User] Sign Up',
    props<{ firstName: string, lastName: string, email: string, password: string; }>()
);

export const signUp_Success = createAction(
    '[Current User] Sign Up (Successful)',
    props<{ data: CurrentUser; }>()
);

export const signUp_Failure = createAction(
    '[Current User] Sign Up (Failure)',
    props<{ error: string; }>()
);

// accept invitation
export const acceptProjectRoleInvitation = createAction(
    '[Current User] Accept Project Role Invitation',
    props<{ userId: string, projectId: string; }>()
);

export const acceptProjectRoleInvitation_Success = createAction(
    '[Current User] Accept Project Role Invitation (Success)',
    props<{ projectRole: ProjectRole; }>()
);

export const acceptProjectRoleInvitation_Failure = createAction(
    '[Current User] Accept Project Role Invitation (Failure)',
    props<{ error: string; }>()
);
