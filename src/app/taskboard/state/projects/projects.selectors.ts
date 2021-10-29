import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, ProjectState } from "src/app/shared/state";
import { Project } from "src/app/shared/types";
import { selectRouteParams } from "./../router.selectors";

const getProjectsFeatureSelector = createFeatureSelector<AppState, ProjectState>('projects');

export const getAllProjectsOfCurrentUser = createSelector(
    getProjectsFeatureSelector,
    (projectsState: ProjectState) => projectsState.data || []
);

export const getProjectsError = createSelector(
    getProjectsFeatureSelector,
    (projectsState: ProjectState) => projectsState.error
);

export const getProject = createSelector(
    getAllProjectsOfCurrentUser,
    selectRouteParams,
    (projects: Project[], { projectId }) => projects.find((project: Project) => project._id === projectId)
);

