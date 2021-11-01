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
        if (state.data && state.data != null) {
            return {
                data: state.data.concat(action.tasks),
                error: null
            };
        }

        return {
            data: [...action.tasks],
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
        if (state.data && state.data != null) {
            return {
                data: state.data.concat(action.tasks),
                error: null
            };
        }

        return {
            data: [...action.tasks],
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
        if (state.data && state.data != null) {
            return {
                data: state.data.concat([action.task]),
                error: null
            };
        }

        return {
            data: [action.task],
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
        if (state.data && state.data != null) {
            const data = [...state.data];
            const index = data.findIndex((task: Task) => task._id === action.task._id);

            data[index] = action.task;

            return {
                data,
                error: null
            };
        }

        return {
            ...state
        };
    }),
    on(TaskActions.updateTask_Failure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(TaskActions.deleteTask_Success, (state, action) => {
        if (state.data && state.data != null) {
            return {
                data: state.data.filter((task: Task) => task._id !== action._id),
                error: null
            };
        }

        return {
            ...state
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
            return {
                data: state.data.filter(task => task.projectId !== action.projectId),
                error: null
            };
        }

        return {
            ...state
        };
    })
);