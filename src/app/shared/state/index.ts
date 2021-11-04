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
    data: { [key: string]: Omit<Project, '_id'>; };
    error: string | null;
}

export interface ProjectRoleState {
    data: { [key: string]: Omit<ProjectRole, '_id'>; };
    error: string | null;
}

export interface TaskState {
    data: { [key: string]: Omit<Task, '_id'>; };
    error: string | null;
}

export interface AppState {
    router: RouterState;
    currentUser: CurrentUserState;
    projects: ProjectState;
    projectRoles: ProjectRoleState;
    tasks: TaskState;
}

