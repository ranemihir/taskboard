import { createAction, props } from "@ngrx/store";
import { ProjectRole } from "src/app/shared/types";


// retreive
export const fetchProjectRole = createAction(
    '[Project Roles] Fetch Project Roles',
    props<{ _id: string; }>()
);

export const fetchProjectRoleSuccess = createAction(
    '[Project Roles] Fetch Project Roles Success'
);

export const fetchProjectRoleFailure = createAction(
    '[Project Roles] Fetch Project Roles Failure'
);

// create
export const createProjectRole = createAction(
    '[Project Roles] Create Project Role',
    props<{ userId: string, projectId: string, authorisedStatusIds: string[]; }>()
);

export const createProjectRoleSuccess = createAction(
    '[Project Roles] Create Project Role Success',
    props<{ projectRole: ProjectRole; }>()
);

export const createProjectRoleFailure = createAction(
    '[Project Roles] Create Project Role Failure',
    props<{ error: string; }>()
);