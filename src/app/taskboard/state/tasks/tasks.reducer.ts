import { createReducer } from "@ngrx/store";
import { TaskState } from "src/app/shared/state";


const initialState: TaskState = {
    data: null,
    error: null
};

export const tasksReducer = createReducer<TaskState>(
    initialState as TaskState,
    
);