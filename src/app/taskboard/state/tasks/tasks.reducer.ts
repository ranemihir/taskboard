import { createReducer, on } from "@ngrx/store";
import { TaskState } from "src/app/shared/state";
import { Task } from "src/app/shared/types";
import * as TaskActions from "./tasks.actions";


const initialState: TaskState = {
    data: {},
    error: null
};

export const tasksReducer = createReducer<TaskState>(
    initialState as TaskState,
    on(TaskActions.fetchTask_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                [action.task._id]: action.task
            },
            error: null
        };
    }),
    on(TaskActions.fetchTask_Failure, (state, action) => {
        return {
            ...state,
            error: null
        };
    }),
    on(TaskActions.fetchAllTasksAssignedToCurrentUserFromAllProjects_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                ...(action.tasks.reduce((acc, task: Task) => ({
                    ...acc,
                    [task._id]: { ...task }
                }), {}))
            },
            error: null
        };
    }),
    on(TaskActions.fetchAllTasksAssignedToCurrentUserFromAllProjects_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(TaskActions.fetchAllTasksOfProject_Success, (state, action) => {
        return {
            data: {
                ...state.data,
                ...(action.tasks.reduce((acc, task: Task) => ({
                    ...acc,
                    [task._id]: { ...task }
                }), {}))
            },
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
        return {
            data: {
                ...state.data,
                [action.task._id]: action.task
            },
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
        return {
            data: {
                ...state.data,
                [action.task._id]: { ...action.task }
            },
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
        return {
            data: {
                ...state.data,
                [action._id]: undefined
            },
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
        return {
            data: {
                ...(Object.keys(state.data).filter((_id: string) => state.data[_id].projectId !== action.projectId).reduce((acc, _id: string) => ({
                    ...acc,
                    [_id]: state.data[_id]
                }), {}))
            },
            error: null
        };
    })
);