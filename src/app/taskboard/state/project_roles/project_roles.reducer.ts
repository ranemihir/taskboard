import { createReducer, on } from "@ngrx/store";
import { ProjectRoleState } from "src/app/shared/state";
import { ProjectRole } from "src/app/shared/types";
import * as ProjectRolesActions from "./project_roles.actions";


const initialState: ProjectRoleState = {
    data: null,
    error: null
};

export const projectRolesReducer = createReducer<ProjectRoleState>(
    initialState as ProjectRoleState,
    on(ProjectRolesActions.fetchAllProjectRolesOfProject_Success, (state, action) => {
        if (!(state.data && state.data != null)) {
            state.data = [];
        }

        state.data.concat(action.projectRoles);

        return {
            ...state,
            error: null
        };
    }),
    on(ProjectRolesActions.fetchAllProjectRolesOfProject_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectRolesActions.updateProjectRole_Success, (state, action) => {
        if (state.data && state.data != null) {
            const index = state.data.findIndex((projectRole: ProjectRole) => projectRole._id === action.projectRole._id);
            state.data[index] = action.projectRole;
        }

        return {
            ...state,
            error: null
        };
    }),
    on(ProjectRolesActions.updateProjectRole_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectRolesActions.deleteProjectRole_Success, (state, action) => {
        if (state.data && state.data != null) {
            const index = state.data.findIndex((projectRole: ProjectRole) => projectRole._id === action._id);
            state.data.splice(index, 1);
        }

        return {
            ...state,
            error: null
        };
    }),
    on(ProjectRolesActions.deleteProjectRole_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectRolesActions.deleteAllProjectRolesOfProject, (state, action) => {
        if (state.data && state.data != null) {
            state.data = state.data.filter(projectRole => projectRole.projectId === action.projectId);
        }

        return {
            ...state
        };
    })
);