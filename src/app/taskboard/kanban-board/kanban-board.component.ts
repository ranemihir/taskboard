import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/state';
import { CurrentUser, Project, ProjectRole, Task } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
import * as ProjectsActions from './../state/projects/projects.actions';
import * as ProjectsSelectors from './../state/projects/projects.selectors';
import * as ProjectRolesSelectors from './../state/project_roles/project_roles.selectors';
import * as TasksSelectors from './../state/tasks/tasks.selectors';
import * as TasksActions from 'src/app/taskboard/state/tasks/tasks.actions';
import * as ProjectRolesActions from 'src/app/taskboard/state/project_roles/project_roles.actions';
import * as CurrentUserSelectors from 'src/app/auth/state/current_user/current_user.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  project$: Observable<Project>;
  projectRoles: { [key: string]: Omit<ProjectRole, '_id'>; };
  projectRolesSub: Subscription;
  tasks$: Observable<{ [key: string]: { [key: string]: Omit<Task, '_id'>; }; }>;
  currentUser$: Observable<CurrentUser>;

  avatarUrl: string = environment.avatarUrl;

  constructor(
    private store: Store<AppState>
  ) {
    this.project$ = this.store.select(ProjectsSelectors.getProject).pipe(
      map((project: Project) => {
        this.store.dispatch(TasksActions.fetchAllTasksOfProject({ projectId: project._id }));
        this.store.dispatch(ProjectRolesActions.fetchAllProjectRolesOfProject({ projectId: project._id }));
        return project;
      })
    );

    this.projectRolesSub = this.store.select(ProjectRolesSelectors.fetchAllProjectRolesOfProject).subscribe(projectRoles => {
      this.projectRoles = projectRoles;
    });

    this.tasks$ = this.store.select(TasksSelectors.getAllTasksOfProject);

    this.currentUser$ = this.store.select(CurrentUserSelectors.get);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.projectRolesSub.unsubscribe();
  }

}
