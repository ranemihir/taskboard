import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppState } from "src/app/shared/state";
import { Project } from "src/app/shared/types";
import { ProjectsService } from "./projects.service";
import * as ProjectsActions from "./projects.actions";

@Injectable({
    providedIn: 'root'
})
export class ProjectResolver implements Resolve<Project> {
    constructor(
        private store: Store<AppState>,
        private projectsService: ProjectsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Project | Observable<Project> | Promise<Project> {
        const projectId = route.paramMap.get('projectId');

        if (projectId && projectId != null) {
            return this.projectsService.fetch(projectId).pipe(
                map((project: Project) => {
                    this.store.dispatch(ProjectsActions.fetchProject_Success({ project }));
                    return project;
                }),
                catchError((error) => {
                    console.error(error);
                    this.store.dispatch(ProjectsActions.fetchProject_Failure({ error }));
                    return EMPTY;
                })
            );
        }

        return EMPTY;
    }
}