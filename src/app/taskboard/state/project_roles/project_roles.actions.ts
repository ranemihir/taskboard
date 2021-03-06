import { createAction, props } from "@ngrx/store";
import { ProjectRole } from "src/app/shared/types";


// retreive
export const fetchProjectRole_Success = createAction(
    '[Project Roles] Fetch Project Role (Success)',
    props<{ projectRole: ProjectRole; }>()
);

export const fetchProjectRole_Failure = createAction(
    '[Project Roles] Fetch Project Role (Failure)',
    props<{ error: string; }>()
);

export const fetchAllProjectRolesOfProject = createAction(
    '[Project Roles] Fetch All Project Roles of Project',
    props<{ projectId: string; }>()
);

export const fetchAllProjectRolesOfProject_Success = createAction(
    '[Project Roles] Fetch Project Roles (Success)',
    props<{ projectRoles: ProjectRole[]; }>()
);

export const fetchAllProjectRolesOfProject_Failure = createAction(
    '[Project Roles] Fetch Project Roles (Failure)',
    props<{ error: string; }>()
);

export const fetchAllProjectRolesOfCurrentUser_Success = createAction(
    '[Project Roles] Fetch Project Roles of Current User (Success)',
    props<{ projectRoles: ProjectRole[]; }>()
);

export const fetchAllProjectRolesOfCurrentUser_Failure = createAction(
    '[Project Roles] Fetch Project Roles of Current User (Failure)',
    props<{ error: string; }>()
);

// update
export const updateProjectRole = createAction(
    '[Project Roles] Update Project Role Ids',
    props<{ _id: string, authorisedStatusIds: string[]; }>()
);

export const updateProjectRole_Success = createAction(
    '[Project Roles] Update Project Role (Success)',
    props<{ projectRole: ProjectRole; }>()
);

export const updateProjectRole_Failure = createAction(
    '[Project Roles] Update Project Role (Failure)',
    props<{ error: string; }>()
);

// accept invitation
export const acceptProjectRoleInvitation = createAction(
    '[Project Roles] Accept Project Role Invitation',
    props<{ userId: string, projectId: string; }>()
);

export const acceptProjectRoleInvitation_Success = createAction(
    '[Project Roles] Accept Project Role Invitation (Success)',
    props<{ projectRole: ProjectRole; }>()
);

export const acceptProjectRoleInvitation_Failure = createAction(
    '[Project Roles] Accept Project Role Invitation (Failure)',
    props<{ error: string; }>()
);



// delete
export const deleteProjectRole = createAction(
    '[Project Roles] Delete Project Role',
    props<{ _id: string; }>()
);

export const deleteProjectRole_Success = createAction(
    '[Project Roles] Delete Project Role (Success)',
    props<{ _id: string; }>()
);

export const deleteProjectRole_Failure = createAction(
    '[Project Roles] Delete Project Role (Failure)',
    props<{ error: string; }>()
);


export const deleteAllProjectRolesOfProject = createAction(
    '[Project Roles] Delete All Project Roles of Project',
    props<{ projectId: string; }>()
);