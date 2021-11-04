import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, ProjectRoleState } from "src/app/shared/state";
import { ProjectRole } from "src/app/shared/types";
import { selectRouteParams } from "../../../router-state/router-state.selectors";

const projectRolesFeatureSelector = createFeatureSelector<AppState, ProjectRoleState>('projectRoles');

const getAllProjectRoles = createSelector(
    projectRolesFeatureSelector,
    (projectRoleState: ProjectRoleState) => projectRoleState.data || {}
);

export const getProjectRoleFactorySelector = (projectRoleId: string) => createSelector(
    getAllProjectRoles,
    (projectRoles: { [key: string]: Omit<ProjectRole, '_id'>; }) => ({ ...projectRoles[projectRoleId], _id: projectRoleId })
);

export const fetchAllProjectRolesOfProject = createSelector(
    getAllProjectRoles,
    selectRouteParams,
    (projectRoles: { [key: string]: Omit<ProjectRole, '_id'>; }, { projectId }) => ({
        ...(Object.keys(projectRoles).filter((_id: string) => projectRoles[_id].projectId === projectId).reduce((acc, _id) => ({
            ...acc,
            [_id]: projectRoles[_id]
        }), {}))
    })
);

export const getProjectRolesError = createSelector(
    projectRolesFeatureSelector,
    (projectRoleState: ProjectRoleState) => projectRoleState.error
);