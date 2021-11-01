import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectsService } from "./projects.service";
import * as ProjectsActions from "./projects.actions";
import * as TasksActions from "./../tasks/tasks.actions";
import * as ProjectRolesActions from "./../project_roles/project_roles.actions";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Project } from "src/app/shared/types";
import { of } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProjectsEffects {
    constructor(
        private $actions: Actions,
        private projectsService: ProjectsService
    ) { };

    fetchAllProjectsOfCurrentUser$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectsActions.fetchAllProjectsOfCurrentUser),
            mergeMap(action => this.projectsService.fetchAllProjectsOfCurrentUser().pipe(
                map((projects: Project[]) => {
                    return ProjectsActions.fetchAllProjectsOfCurrentUser_Success({ projects });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectsActions.fetchAllProjectsOfCurrentUser_Failure({ error }));
                })
            ))
        );
    });

    fetch$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectsActions.fetchProject),
            mergeMap(action => this.projectsService.fetch(action._id).pipe(
                map((project: Project) => {
                    return ProjectsActions.fetchProject_Success({ project });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectsActions.fetchProject_Failure({ error }));
                })
            ))
        );
    });

    create$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectsActions.createProject),
            mergeMap(action => this.projectsService.createProject(action.name, action.description).pipe(
                map((project: Project) => {
                    return ProjectsActions.createProject_Success({ project });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectsActions.createProject_Failure({ error }));
                })
            ))
        );
    });

    update$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectsActions.updateProject),
            mergeMap(action => this.projectsService.updateProject(action._id, action.name, action.description, action.adminUserIds, action.invites).pipe(
                map((project: Project) => {
                    return ProjectsActions.updateProject_Success({ project });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectsActions.updateProject_Failure({ error }));
                })
            ))
        );
    });

    delete$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectsActions.deleteProject),
            mergeMap(action => this.projectsService.deleteProject(action._id).pipe(
                map((_id: string) => {
                    TasksActions.deleteAllTasksOfProject({ projectId: _id });
                    ProjectRolesActions.deleteAllProjectRolesOfProject({ projectId: _id });
                    return ProjectsActions.deleteProject_Success({ _id });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectsActions.deleteProject_Failure({ error }));
                })
            ))
        );
    });
}