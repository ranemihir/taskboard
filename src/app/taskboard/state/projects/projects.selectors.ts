import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, ProjectState } from "src/app/shared/state";
import { Project } from "src/app/shared/types";
import { selectRouteParams } from "../../../router-state/router-state.selectors";

const projectsFeatureSelector = createFeatureSelector<AppState, ProjectState>('projects');

export const getAllProjectsOfCurrentUser = createSelector(
    projectsFeatureSelector,
    (projectsState: ProjectState) => projectsState.data || {}
);

export const getProjectsError = createSelector(
    projectsFeatureSelector,
    (projectsState: ProjectState) => projectsState.error
);

export const getProject = createSelector(
    getAllProjectsOfCurrentUser,
    selectRouteParams,
    (projects: { [key: string]: Omit<Project, "_id">; }, { projectId }) => projects[projectId]
);

