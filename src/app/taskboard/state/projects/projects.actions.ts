import { createAction, props } from "@ngrx/store";
import { Project } from "src/app/shared/types";

// retrieve
export const fetchProjects = createAction(
    '[Projects] Fetch Projects'
);

export const fetchProjectsSuccess = createAction(
    '[Projects] Fetch Projects Success',
    props<{ projects: Project[]; }>()
);

export const fetchProjectsFailure = createAction(
    '[Projects] Fetch Projects Success',
    props<{ error: string; }>()
);

// create
export const createProject = createAction(
    '[Projects] Create Project',
    props<{ name: string, description?: string, adminUserId: string; }>()
);

export const createProjectSuccess = createAction(
    '[Projects] Create Project Success',
    props<{ project: Project; }>()
);

export const createProjectFailure = createAction(
    '[Projects] Create Project Failure',
    props<{ error: string; }>()
);

// update
export const updateProject = createAction(
    '[Projects] Update Project',
    props<{ _id: string; name?: string; description?: string; adminUserIds: string[]; }>()
);

export const updateProjectSuccess = createAction(
    '[Projects] Update Project Success',
    props<{ project: Project; }>()
);

export const updateProjectFailure = createAction(
    '[Projects] Update Project Failure',
    props<{ error: string; }>()
);

// delete
export const deleteProject = createAction(
    '[Projects] Delete Project',
    props<{ _id: string; }>()
);

export const deleteProjectSuccess = createAction(
    '[Projects] Delete Project Success',
    props<{ _id: string; }>()
);

export const deleteProjectFailure = createAction(
    '[Projects] Delete Project Failure',
    props<{ error: string; }>()
);
