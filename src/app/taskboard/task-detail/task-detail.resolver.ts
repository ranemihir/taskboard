import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { AppState } from "src/app/shared/state";
import { ProjectRole, Task } from "src/app/shared/types";
import * as ProjectRolesActions from "../state/project_roles/project_roles.actions";
import * as TasksActions from "../state/tasks/tasks.actions";
import { TasksService } from "../state/tasks/tasks.service";
import { ProjectRolesService } from "../state/project_roles/project-roles.service";

@Injectable({
    providedIn: 'root'
})
export class TaskDetailResolver implements Resolve<{ task: Task, projectRole: ProjectRole; }> {
    constructor(
        private store: Store<AppState>,
        private tasksService: TasksService,
        private projectRolesService: ProjectRolesService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): { task: Task, projectRole: ProjectRole; } | Observable<{ task: Task, projectRole: ProjectRole; }> | Promise<{ task: Task, projectRole: ProjectRole; }> {
        const taskId = route.paramMap.get('taskId');
        const projectId = route.paramMap.get('projectId');


        return this.tasksService.fetchTask(projectId, taskId).pipe(
            mergeMap((task: Task) => {
                this.store.dispatch(TasksActions.fetchTask_Success({ task }));

                if (task && task != null) {
                    return this.projectRolesService.fetchProjectRole(projectId, task.assignedTo).pipe(
                        map((projectRole: ProjectRole) => {
                            this.store.dispatch(ProjectRolesActions.fetchProjectRole_Success({ projectRole }));

                            return {
                                task,
                                projectRole
                            };
                        })
                    );
                }

                return EMPTY;
            })
        );
    }

}