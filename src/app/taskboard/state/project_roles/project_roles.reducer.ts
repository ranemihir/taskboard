import { createReducer } from "@ngrx/store";
import { ProjectRoleState } from "src/app/shared/state";

const initialState: ProjectRoleState = {
    data: null,
    error: null
};

export const projectRolesReducer = createReducer<ProjectRoleState>(
    initialState as ProjectRoleState,
);