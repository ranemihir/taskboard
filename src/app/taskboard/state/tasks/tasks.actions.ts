import { createAction, props } from "@ngrx/store";


//retreive
export const fetchTasks = createAction(
    '[Tasks] Fetch Tasks'
);

export const fetchTaskSuccess = createAction(
    '[Tasks] Create Task Success',
    props<{ tasks: Task[]; }>()
);

export const fetchTaskFailure = createAction(
    '[Tasks] Create Task Failure',
    props<{ error: string; }>()
);

// create
export const createTask = createAction(
    '[Tasks] Create Task',
    props<{ title: string, statusId: string; }>()
);

export const createTaskSuccess = createAction(
    '[Tasks] Create Task Success',
    props<{ task: Task; }>()
);

export const createTaskFailure = createAction(
    '[Tasks] Create Task Failure',
    props<{ error: string; }>()
);

// update
export const updateTask = createAction(
    '[Tasks] Update Task',
    props<{ _id: string, title?: string, statusId?: string, dueDate?: string, priority?: string, assignedTo?: string; }>()
);

export const updateTaskSuccess = createAction(
    '[Tasks] Update Task Success',
    props<{ task: Task; }>()
);

export const updateTaskFailure = createAction(
    '[Tasks] Create Task Failure',
    props<{ error: string; }>()
);

// delete
export const deleteTask = createAction(
    '[Tasks] Delete Task',
    props<{ _id: string; }>()
);

export const deleteTaskSuccess = createAction(
    '[Tasks] Delete Task Success',
    props<{ _id: string; }>()
);

export const deleteTaskFailure = createAction(
    '[Tasks] Delete Task Failure',
    props<{ error: string; }>()
);