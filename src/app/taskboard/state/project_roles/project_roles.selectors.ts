import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, ProjectRoleState } from "src/app/shared/state";
import { ProjectRole } from "src/app/shared/types";
import { selectRouteParams } from "../../../router-state/router-state.selectors";

const projectRolesFeatureSelector = createFeatureSelector<AppState, ProjectRoleState>('projectRoles');

const getAllProjectRoles = createSelector(
    projectRolesFeatureSelector,
    (projectRoleState: ProjectRoleState) => projectRoleState.data || []
);

export const getProjectRoleFactorySelector = (userId: string, projectId: string) => createSelector(
    getAllProjectRoles,
    (projectRoles: ProjectRole[]) => projectRoles.find((projectRole: ProjectRole) => (projectRole.userId === userId && projectRole.projectId === projectId))
);

export const fetchAllProjectRolesOfProject = createSelector(
    getAllProjectRoles,
    selectRouteParams,
    (projectRoles: ProjectRole[], { projectId }) => projectRoles.filter((projectRole: ProjectRole) => projectRole.projectId === projectId)
);

export const getProjectRolesError = createSelector(
    projectRolesFeatureSelector,
    (projectRoleState: ProjectRoleState) => projectRoleState.error
);