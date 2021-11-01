import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, CurrentUserState, TaskState } from "src/app/shared/state";
import { Task } from "src/app/shared/types";
import { selectRouteParams } from "../../../router-state/router-state.selectors";


const tasksFeatureSelector = createFeatureSelector<AppState, TaskState>('tasks');

const getAllTasks = createSelector(
    tasksFeatureSelector,
    (taskState: TaskState) => taskState.data || []
);

const currentUserFeatureSelector = createFeatureSelector<AppState, CurrentUserState>('currentUser');


export const getAllTasksAssignedToCurrentUserFromAllProjects = createSelector(
    getAllTasks,
    currentUserFeatureSelector,
    (tasks: Task[], currentUser: CurrentUserState) => {
        if (currentUser.data && currentUser.data != null) {
            const userId = currentUser.data._id;
            return tasks.filter((task: Task) => task.assignedTo === userId);
        }

        return null;
    }
);

export const getTasksOfProject = (projectId: string) => createSelector(
    getAllTasks,
    (tasks: Task[]) => {
        return tasks.filter((task: Task) => task.projectId === projectId);
    }
);

export const getTask = createSelector(
    getAllTasks,
    selectRouteParams,
    (tasks: Task[], { taskId }) => tasks.find((task: Task) => task._id === taskId)
);