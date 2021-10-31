import { createReducer, on } from "@ngrx/store";
import { TaskState } from "src/app/shared/state";
import { Task } from "src/app/shared/types";
import * as TaskActions from "./tasks.actions";


const initialState: TaskState = {
    data: null,
    error: null
};

export const tasksReducer = createReducer<TaskState>(
    initialState as TaskState,
    on(TaskActions.fetchAllTasksAssignedToCurrentUserFromAllProjects_Success, (state, action) => {
        if (!(state.data && state.data != null)) {
            state.data = [];
        }

        state.data.concat(action.tasks);

        return {
            ...state,
            error: null
        };
    }),
    on(TaskActions.fetchAllTasksAssignedToCurrentUserFromAllProjects_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(TaskActions.fetchTasksOfProject_Success, (state, action) => {
        if (!(state.data && state.data != null)) {
            state.data = [];
        }

        state.data.concat(action.tasks);

        return {
            ...state,
            error: null
        };
    }),
    on(TaskActions.fetchAllTasksOfProject_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(TaskActions.createTask_Success, (state, action) => {
        if (!(state.data && state.data != null)) {
            state.data = [];
        }

        state.data.push(action.task);

        return {
            ...state,
            error: null
        };
    }),
    on(TaskActions.createTask_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(TaskActions.updateTask_Success, (state, action) => {
        if (!(state.data && state.data != null)) {
            state.data = [];
        }

        const index = state.data.findIndex((task: Task) => task._id === action.task._id);
        state.data[index] = action.task;

        return {
            ...state,
            error: null
        };
    }),
    on(TaskActions.updateTask_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(TaskActions.deleteTask_Success, (state, action) => {
        if (!(state.data && state.data != null)) {
            state.data = [];
        }

        const index = state.data.findIndex((task: Task) => task._id === action._id);
        state.data.splice(index, 1);

        return {
            ...state,
            error: null
        };
    }),
    on(TaskActions.deleteTask_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(TaskActions.deleteAllTasksOfProject, (state, action) => {
        if (state.data && state.data != null) {
            state.data = state.data.filter(task => task.projectId === action.projectId);
        }

        return {
            ...state
        };
    })
);