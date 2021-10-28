import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectRoleState } from "src/app/shared/state";

export const projectRoleFeatureSelector = createFeatureSelector<ProjectRoleState>('projectRole');

// export const getProjectRolesOfProject = (projectId: string) => createSelector('allProjectRolesOfProject', (state) => state)