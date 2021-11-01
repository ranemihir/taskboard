import { RouterReducerState } from '@ngrx/router-store';
import { CurrentUser, Project, ProjectRole, Task, CurrentRoute } from './../types';


export interface CurrentUserState {
    data: CurrentUser | null;
    error: string | null;
}

export interface RouterState {
    router: RouterReducerState<CurrentRoute>;
}

export interface ProjectState {
    data: Project[] | null;
    error: string | null;
}

export interface ProjectRoleState {
    data: ProjectRole[] | null;
    error: string | null;
}

export interface TaskState {
    data: Task[] | null;
    error: string | null;
}

export interface AppState {
    router: RouterState;
    currentUser: CurrentUserState;
    projects: ProjectState;
    projectRoles: ProjectRoleState;
    tasks: TaskState;
}

