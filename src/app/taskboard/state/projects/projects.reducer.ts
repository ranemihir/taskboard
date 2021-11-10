import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "src/app/shared/state";
import { Project } from "src/app/shared/types";
import * as ProjectActions from "./projects.actions";

const initialState: ProjectState = {
    data: {},
    error: null
};

export const projectsReducer = createReducer<ProjectState>(
    initialState as ProjectState,
    on(ProjectActions.fetchAllProjectsOfCurrentUser_Success, (state, action) => {
        return {
            data: action.projects.reduce((acc, project: Project) => ({
                ...acc,
                [project._id]: { ...project }
            }), {}),
            error: null
        };
    }),
    on(ProjectActions.fetchAllProjectsOfCurrentUser_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectActions.fetchProject_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                [action.project._id]: { ...action.project }
            },
            error: null
        };
    }),
    on(ProjectActions.fetchProject_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectActions.createProject_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                [action.project._id]: { ...action.project }
            },
            error: null
        };
    }),
    on(ProjectActions.createProject_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectActions.updateProject_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                [action.project._id]: { ...action.project }
            },
            error: null
        };
    }),
    on(ProjectActions.updateProject_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectActions.deleteProject_Success, (state, action) => {
        if (state.data && state.data != null) {
            return {
                data: {
                    ...state.data,
                    [action._id]: undefined
                },
                error: null
            };
        }

        return {
            ...state,
            error: null
        };
    }),
    on(ProjectActions.deleteProject_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    })
);