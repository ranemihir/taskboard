import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, ProjectRoleState } from "src/app/shared/state";
import { ProjectRole } from "src/app/shared/types";
import { selectRouteParams } from "../../../router-state/router-state.selectors";
import * as CurrentUserSelectors from './../../../auth/state/current_user/current_user.selectors';

const projectRolesFeatureSelector = createFeatureSelector<AppState, ProjectRoleState>('projectRoles');

export const getAllProjectRoles = createSelector(
    projectRolesFeatureSelector,
    (projectRoleState: ProjectRoleState) => projectRoleState.data || {}
);

export const getProjectRoleFactorySelector = (projectRoleId: string) => createSelector(
    getAllProjectRoles,
    (projectRoles: { [key: string]: Omit<ProjectRole, '_id'>; }) => ({ ...projectRoles[projectRoleId], _id: projectRoleId })
);

export const getAllProjectRolesOfCurrentUser = createSelector(
    getAllProjectRoles,
    CurrentUserSelectors.getId,
    (projectRoles: { [key: string]: Omit<ProjectRole, '_id'>; }, currentUserId: string) => ({
        ...(Object.keys(projectRoles).filter((_id: string) => projectRoles[_id].userId === currentUserId).reduce((acc, projectRoleId: string) => ({
            ...acc,
            [projectRoleId]: projectRoles[projectRoleId]
        }), {}))
    })
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