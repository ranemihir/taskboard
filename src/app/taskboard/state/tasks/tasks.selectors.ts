import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, CurrentUserState, TaskState } from "src/app/shared/state";
import { Task } from "src/app/shared/types";
import { selectRouteParams } from "../../../router-state/router-state.selectors";


const tasksFeatureSelector = createFeatureSelector<AppState, TaskState>('tasks');

const getAllTasks = createSelector(
    tasksFeatureSelector,
    (taskState: TaskState) => taskState.data || {}
);

const currentUserFeatureSelector = createFeatureSelector<AppState, CurrentUserState>('currentUser');


export const getAllTasksAssignedToCurrentUserFromAllProjects = createSelector(
    getAllTasks,
    currentUserFeatureSelector,
    (tasks: { [key: string]: Omit<Task, '_id'>; }, currentUser: CurrentUserState) => ({
        ...(Object.keys(tasks).filter((_id: string) => tasks[_id].assignedTo === currentUser.data._id).reduce((acc, _id: string) => ({
            ...acc,
            [_id]: { ...tasks[_id] }
        }), {}))
    })
);

export const getAllTasksOfProject = createSelector(
    getAllTasks,
    selectRouteParams,
    (tasks: { [key: string]: Omit<Task, '_id'>; }, { projectId }) => ({
        ...(Object.keys(tasks).filter((_id: string) => tasks[_id].projectId === projectId).reduce((acc, _id: string) => ({
            ...acc,
            [_id]: { ...tasks[_id] }
        }), {}))
    })
);

export const getTask = createSelector(
    getAllTasks,
    selectRouteParams,
    (tasks: { [key: string]: Omit<Task, '_id'>; }, { taskId }) => tasks[taskId]);