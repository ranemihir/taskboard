import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "src/app/shared/state";
import * as ProjectActions from "./projects.actions";

const initialState: ProjectState = {
    data: null,
    error: null
};

export const projectsReducer = createReducer<ProjectState>(
    initialState as ProjectState,
    on(ProjectActions.createProjectSuccess, (state, action) => {
        if (state.data != null) {
            state.data.push(action.project);
        } else {
            state.data = [action.project];
        }

        return {
            ...state,
            error: null
        };
    }),
    on(ProjectActions.createProjectFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectActions.updateProjectSuccess, (state, action) => {
        if (state.data != null) {
            const index = state.data?.findIndex(project => project._id === action.project._id);

            if (index && index > 0) {
                state.data[index] = action.project;
            }
        }

        return {
            ...state,
            error: null
        };
    }),
    on(ProjectActions.updateProjectFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProjectActions.deleteProjectSuccess, (state, action) => {
        if (state.data != null) {
            const index = state.data?.findIndex(project => project._id === action.project._id);

            if (index && index > 0) {
                state.data.splice(index, 1);
            }
        }

        return {
            data: null,
            error: null
        };
    }),
    on(ProjectActions.deleteProjectFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    })
);