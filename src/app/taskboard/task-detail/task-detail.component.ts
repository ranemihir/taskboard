import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { concat, Observable } from 'rxjs';
import { AppState } from 'src/app/shared/state';
import * as TasksSelectors from './../state/tasks/tasks.selectors';
import * as ProjectRolesSelectors from './../state/project_roles/project_roles.selectors';
import { ProjectRole, Task } from 'src/app/shared/types';
import { concatMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as TasksActions from 'src/app/taskboard/state/tasks/tasks.actions';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  avatarUrl: string = environment.avatarUrl;
  data$: Observable<{ task: Task, projectRole: ProjectRole; }>;

  constructor(
    private store: Store<AppState>
  ) {
    this.data$ = this.store.select(TasksSelectors.getTask).pipe(
      concatMap((task: Task) => {
        return this.store.select(ProjectRolesSelectors.getProjectRoleFactorySelector(task.assignedTo)).pipe(
          map((projectRole: ProjectRole) => ({
            task,
            projectRole
          }))
        );
      })
    );
  }

  ngOnInit(): void {
  }

}
