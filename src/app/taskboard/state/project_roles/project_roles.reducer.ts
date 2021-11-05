import { Statement } from "@angular/compiler";
import { createReducer, on } from "@ngrx/store";
import { ProjectRoleState } from "src/app/shared/state";
import { ProjectRole } from "src/app/shared/types";
import * as ProjectRolesActions from "./project_roles.actions";


const initialState: ProjectRoleState = {
    data: {},
    error: null
};

export const projectRolesReducer = createReducer<ProjectRoleState>(
    initialState as ProjectRoleState,
    on(ProjectRolesActions.fetchProjectRole_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                [action.projectRole._id]: action.projectRole
            },
            error: null
        };
    }),
    on(ProjectRolesActions.fetchProjectRole_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectRolesActions.fetchAllProjectRolesOfProject_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                ...(action.projectRoles.reduce((acc, val: ProjectRole) => ({
                    ...acc,
                    [val._id]: { ...val }
                }), {}))
            },
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
        return {
            data: {
                ...state.data,
                [action.projectRole._id]: { ...action.projectRole }
            },
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
        return {
            data: {
                ...state.data,
                [action._id]: undefined
            },
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
        return {
            data: {
                ...(Object.keys(state.data).filter((_id: string) => state.data[_id].projectId !== action.projectId).reduce((acc, _id: string) => ({
                    ...acc,
                    [_id]: { ...state.data[_id] }
                }), {}))
            },
            error: null
        };
    })
);