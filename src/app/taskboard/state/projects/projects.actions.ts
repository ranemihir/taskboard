import { createAction, props } from "@ngrx/store";
import { Project } from "src/app/shared/types";

// retrieve
export const fetchProject_Success = createAction(
    '[Projects] Fetch Project (Success)',
    props<{ project: Project; }>()
);

export const fetchProject_Failure = createAction(
    '[Projects] Fetch Project (Failure)',
    props<{ error: string; }>()
);

// create
export const createProject = createAction(
    '[Projects] Create Project',
    props<{ name: string, description?: string, adminUserId: string; }>()
);

export const createProject_Success = createAction(
    '[Projects] Create Project (Success)',
    props<{ project: Project; }>()
);

export const createProject_Failure = createAction(
    '[Projects] Create Project (Failure)',
    props<{ error: string; }>()
);

// update
export const updateProject = createAction(
    '[Projects] Update Project',
    props<{ _id: string; name?: string; description?: string; adminUserIds: string[]; invites?: string[]; }>()
);

export const updateProject_Success = createAction(
    '[Projects] Update Project (Success)',
    props<{ project: Project; }>()
);

export const updateProject_Failure = createAction(
    '[Projects] Update Project (Failure)',
    props<{ error: string; }>()
);

// delete
export const deleteProject = createAction(
    '[Projects] Delete Project',
    props<{ _id: string; }>()
);

export const deleteProject_Success = createAction(
    '[Projects] Delete Project (Success)',
    props<{ _id: string; }>()
);

export const deleteProject_Failure = createAction(
    '[Projects] Delete Project (Failure)',
    props<{ error: string; }>()
);
