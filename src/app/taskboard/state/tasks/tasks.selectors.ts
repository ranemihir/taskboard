import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, CurrentUserState, ProjectState, TaskState } from "src/app/shared/state";
import { Project, Task } from "src/app/shared/types";
import Status from "src/app/shared/types/status";
import { selectRouteParams } from "../../../router-state/router-state.selectors";
import { getAllProjectsOfCurrentUser } from "../projects/projects.selectors";


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
    getAllProjectsOfCurrentUser,
    getAllTasks,
    selectRouteParams,
    (projects: { [key: string]: Omit<Project, '_id'>; }, tasks: { [key: string]: Omit<Task, '_id'>; }, { projectId }) => {
        const tasksFilteredByStatus = projects[projectId].statuses.map((status: Status): { [key: string]: { [key: string]: Omit<Task, '_id'>; }; } => {
            return {
                [status._id]: (Object.keys(tasks).filter((taskId: string) => tasks[taskId].statusId === status._id).reduce((acc, _id): { [key: string]: Omit<Task, '_id'>; } => ({
                    ...acc,
                    [_id]: { ...tasks[_id] }
                }), {}))
            };
        });

        return tasksFilteredByStatus.reduce((acc, val) => ({
            ...acc,
            ...val
        }), {});
    }
);

export const getTask = createSelector(
    getAllTasks,
    selectRouteParams,
    (tasks: { [key: string]: Omit<Task, '_id'>; }, { taskId }) => ({ ...tasks[taskId], _id: taskId })
);