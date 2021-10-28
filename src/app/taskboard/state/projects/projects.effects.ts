import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectsService } from "./projects.service";
import * as ProjectsActions from "./projects.actions";
import { catchError, map mergeMap } from "rxjs/operators";
import { Project } from "src/app/shared/types";
import { of } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProjectsEffects {
    constructor(
        private $actions: Actions,
        private projectsService: ProjectsService,
        private router: Router
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
}