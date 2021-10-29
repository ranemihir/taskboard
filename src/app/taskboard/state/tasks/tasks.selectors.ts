import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, CurrentUserState, TaskState } from "src/app/shared/state";
import { Task } from "src/app/shared/types";


const tasksFeatureSelector = createFeatureSelector<AppState, TaskState>('tasks');

const currentUserFeatureSelector = createFeatureSelector<AppState, CurrentUserState>('currentUser');


export const getAllTasksAssignedToCurrentUserFromAllProjects = createSelector(
    tasksFeatureSelector,
    currentUserFeatureSelector,
    (tasks: TaskState, currentUser: CurrentUserState) => {
        if (currentUser.data && currentUser.data != null) {
            const userId = currentUser.data._id;

            if (tasks.data && tasks.data != null) {
                return tasks.data.filter((task: Task) => task.assignedTo === userId);
            }

            return null;
        }

        return null;
    }
);

export const getTasksOfProject = (projectId: string) => createSelector(
    tasksFeatureSelector,
    (tasks: TaskState) => {
        if (tasks.data && tasks.data != null) {
            return tasks.data.filter((task: Task) => task.projectId === projectId);
        }

        return null;
    }
);