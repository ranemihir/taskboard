import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as TaskActions from "./tasks.actions";
import { TasksService } from "./tasks.service";
import { Task } from "src/app/shared/types";

@Injectable({
    providedIn: 'root'
})
export class TasksEffects {
    constructor(
        private $actions: Actions,
        private tasksService: TasksService
    ) { }

    fetchAllTasksAssignedToCurrentUserFromAllProjects$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(TaskActions.fetchAllTasksAssignedToCurrentUserFromAllProjects),
            mergeMap(action => this.tasksService.fetchAllTasksAssignedToCurrentUserFromAllProjects().pipe(
                map((tasks: Task[]) => {
                    return TaskActions.fetchAllTasksAssignedToCurrentUserFromAllProjects_Success({ tasks });
                }),
                catchError(error => {
                    console.error(error);
                    return of(TaskActions.fetchAllTasksAssignedToCurrentUserFromAllProjects_Failure({ error }));
                })
            ))
        );
    });

    fetchTasksOfProject$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(TaskActions.fetchTasksOfProject),
            mergeMap(action => this.tasksService.fetchTasksOfProject(action.projectId).pipe(
                map((tasks: Task[]) => {
                    return TaskActions.fetchTasksOfProject_Success({ tasks });
                }),
                catchError(error => {
                    console.error(error);
                    return of(TaskActions.fetchAllTasksOfProject_Failure({ error }));
                })
            ))
        );
    });

    createTask$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(TaskActions.createTask),
            mergeMap(action => this.tasksService.createTask(action.projectId, action.title, action.statusId).pipe(
                map((task: Task) => {
                    return TaskActions.createTask_Success({ task });
                }),
                catchError(error => {
                    console.error(error);
                    return of(TaskActions.createTask_Failure({ error }));
                })
            ))
        );
    });

    updateTask$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(TaskActions.updateTask),
            mergeMap(action => this.tasksService.updateTask(action._id, action.projectId, action.title, action.statusId, action.dueDate, action.priority, action.assignedTo).pipe(
                map((task: Task) => {
                    return TaskActions.updateTask_Success({ task });
                }),
                catchError(error => {
                    console.error(error);
                    return of(TaskActions.updateTask_Failure({ error }));
                })
            ))
        );
    });

    deleteTask$ = createEffect(() => {
        return this.$actions.pipe(
            ofType(TaskActions.deleteTask),
            mergeMap(action => this.tasksService.deleteTask(action._id, action.projectId).pipe(
                map((_id: string) => {
                    return TaskActions.deleteTask_Success({ _id });
                }),
                catchError(error => {
                    console.error(error);
                    return of(TaskActions.deleteTask_Failure({ error }));
                })
            ))
        );
    });
}