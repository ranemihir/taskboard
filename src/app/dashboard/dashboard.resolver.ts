import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppState } from "src/app/shared/state";
import { Project, ProjectRole } from "src/app/shared/types";
import { ProjectsService } from "../taskboard/state/projects/projects.service";
import * as ProjectsActions from "../taskboard/state/projects/projects.actions";
import * as ProjectRolesActions from "../taskboard/state/project_roles/project_roles.actions";

@Injectable({
    providedIn: 'root'
})
export class DashboardResolver implements Resolve<Project[]> {
    constructor(
        private store: Store<AppState>,
        private projectsService: ProjectsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Project[] | Observable<Project[]> | Promise<Project[]> {
        return this.projectsService.fetchAllProjectsAndProjectRolesOfCurrentUser().pipe(
            map((data: { projects: Project[], projectRoles: ProjectRole[]; }) => {
                this.store.dispatch(ProjectsActions.fetchAllProjectsOfCurrentUser_Success({ projects: data.projects }));
                this.store.dispatch(ProjectRolesActions.fetchAllProjectRolesOfCurrentUser_Success({ projectRoles: data.projectRoles }));

                return data.projects;
            }),
            catchError((error: string) => {
                this.store.dispatch(ProjectsActions.fetchAllProjectsOfCurrentUser_Failure({ error }));
                this.store.dispatch(ProjectRolesActions.fetchAllProjectRolesOfCurrentUser_Failure({ error }));

                console.error(error);
                return EMPTY;
            })
        );
    }
}