import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/shared/types";


//retreive
export const fetchTasksOfProject = createAction(
    '[Tasks] Fetch Tasks of Project',
    props<{ projectId: string; }>()
);

export const fetchTasksOfProject_Success = createAction(
    '[Tasks] Fetch Tasks of Project (Success)',
    props<{ tasks: Task[]; }>()
);

export const fetchAllTasksOfProject_Failure = createAction(
    '[Tasks] Fetch Tasks of Project (Failure)',
    props<{ error: string; }>()
);

export const fetchAllTasksAssignedToCurrentUserFromAllProjects = createAction(
    '[Tasks] Fetch All Tasks Assigned to Current User from All Projects'
);

export const fetchAllTasksAssignedToCurrentUserFromAllProjects_Success = createAction(
    '[Tasks] Fetch All Tasks Assigned to Current User from All Projects (Success)',
    props<{ tasks: Task[]; }>()
);

export const fetchAllTasksAssignedToCurrentUserFromAllProjects_Failure = createAction(
    '[Tasks] Fetch All Tasks Assigned to Current User from All Projects (Failure)',
    props<{ error: string; }>()
);


// create
export const createTask = createAction(
    '[Tasks] Create Task',
    props<{ projectId: string, title: string, statusId: string; }>()
);

export const createTask_Success = createAction(
    '[Tasks] Create Task (Success)',
    props<{ task: Task; }>()
);

export const createTask_Failure = createAction(
    '[Tasks] Create Task (Failure)',
    props<{ error: string; }>()
);

// update
export const updateTask = createAction(
    '[Tasks] Update Task',
    props<{ _id: string, projectId: string, title?: string, statusId?: string, dueDate?: string, priority?: string, assignedTo?: string; }>()
);

export const updateTask_Success = createAction(
    '[Tasks] Update Task (Success)',
    props<{ task: Task; }>()
);

export const updateTask_Failure = createAction(
    '[Tasks] Create Task (Failure)',
    props<{ error: string; }>()
);

// delete
export const deleteTask = createAction(
    '[Tasks] Delete Task',
    props<{ _id: string; projectId: string; }>()
);

export const deleteTask_Success = createAction(
    '[Tasks] Delete Task (Success)',
    props<{ _id: string; }>()
);

export const deleteTask_Failure = createAction(
    '[Tasks] Delete Task (Failure)',
    props<{ error: string; }>()
);