import { CurrentUser, Project, ProjectRole, Task } from './../types';


export interface CurrentUserState {
    data: CurrentUser | null;
    error: string | null;
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
    currentUser: CurrentUserState;
    projects: ProjectState;
    projectRoles: ProjectRoleState;
    tasks: TaskState;
}

