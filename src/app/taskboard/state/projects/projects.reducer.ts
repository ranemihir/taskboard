import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "src/app/shared/state";
import { Project } from "src/app/shared/types";
import * as ProjectActions from "./projects.actions";

const initialState: ProjectState = {
    data: null,
    error: null
};

export const projectsReducer = createReducer<ProjectState>(
    initialState as ProjectState,
    on(ProjectActions.fetchProject_Success, (state, action) => {
        if (state.data && state.data != null) {
            return {
                data: state.data.concat([action.project]),
                error: null
            };
        }

        return {
            data: [action.project],
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
        if (state.data && state.data != null) {
            return {
                data: state.data.concat(action.project),
                error: null
            };
        }

        return {
            data: [action.project],
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
        if (state.data && state.data != null) {
            const data: Project[] = [...state.data];

            const index = data.findIndex(project => project._id === action.project._id);

            if (index && index > 0) {
                data[index] = action.project;
            }

            return {
                data,
                error: null
            };
        }

        return {
            ...state
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
                data: state.data.filter((project: Project) => project._id !== action._id),
                error: null
            };
        }

        return {
            ...state
        };
    }),
    on(ProjectActions.deleteProject_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    })
);