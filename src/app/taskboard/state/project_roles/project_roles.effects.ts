import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ProjectRole } from "src/app/shared/types";
import { ProjectRolesService } from "./project-roles.service";
import * as ProjectRolesActions from "./project_roles.actions";


@Injectable({
    providedIn: 'root'
})
export class ProjectRolesEffects {
    constructor(
        private $actions: Actions,
        private projectRolesService: ProjectRolesService
    ) { }

    fetchAllProjectRolesOfProject$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectRolesActions.fetchAllProjectRolesOfProject),
            mergeMap(action => this.projectRolesService.fetchAllProjectRolesOfProject(action.projectId).pipe(
                map((projectRoles: ProjectRole[]) => {
                    return ProjectRolesActions.fetchAllProjectRolesOfProject_Success({ projectRoles });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectRolesActions.fetchAllProjectRolesOfProject_Failure({ error }));
                })
            ))
        );
    });

    createProjectRole$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectRolesActions.createProjectRole),
            mergeMap(action => this.projectRolesService.createProjectRole(action.userId, action.projectId, action.authorisedStatusIds).pipe(
                map((projectRole: ProjectRole) => {
                    return ProjectRolesActions.createProjectRole_Success({ projectRole });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectRolesActions.createProjectRole_Failure({ error }));
                })
            ))
        );
    });

    updateProjectRole$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectRolesActions.updateProjectRole),
            mergeMap(action => this.projectRolesService.updateProjectRole(action._id, action.authorisedStatusIds).pipe(
                map((projectRole: ProjectRole) => {
                    return ProjectRolesActions.updateProjectRole_Success({ projectRole });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectRolesActions.updateProjectRole_Failure({ error }));
                })
            ))
        );
    });

    deleteProjectRole$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(ProjectRolesActions.deleteProjectRole),
            mergeMap(action => this.projectRolesService.deleteProjectRole(action._id).pipe(
                map((_id: string) => {
                    return ProjectRolesActions.deleteProjectRole_Success({ _id });
                }),
                catchError(error => {
                    console.error(error);
                    return of(ProjectRolesActions.deleteProjectRole_Failure({ error }));
                })
            ))
        );
    });
}