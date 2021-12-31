import { Component, OnDestroy, OnInit } from '@angular/core';
import * as ProjectsSelectors from './../taskboard/state/projects/projects.selectors';
import * as TasksSelectors from './../taskboard/state/tasks/tasks.selectors';

import { Observable, Subscription } from 'rxjs';
import { CurrentUser, Project, Task } from './../shared/types';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/state';
import { map } from 'rxjs/operators';
import * as TasksActions from 'src/app/taskboard/state/tasks/tasks.actions';
import * as CurrentUserSelectors from 'src/app/auth/state/current_user/current_user.selectors';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  assignedTasks$: Observable<{ [key: string]: Omit<Task, "_id">; }>;
  projects$: Observable<{ [key: string]: Omit<Project, "_id">; }>;
  projectsSub: Subscription;
  currentUser$: Observable<CurrentUser>;
  avatarUrl: string = environment.avatarUrl;

  constructor(
    private store: Store<AppState>
  ) {
    this.projects$ = this.store.select(ProjectsSelectors.getAllProjectsOfCurrentUser);
    this.assignedTasks$ = this.store.select(TasksSelectors.getAllTasksAssignedToCurrentUserFromAllProjects);
    this.currentUser$ = this.store.select(CurrentUserSelectors.get);
  }

  ngOnInit(): void {
    this.projectsSub = this.projects$.subscribe((projects: { [key: string]: Omit<Project, "_id">; }) => {
      console.log(projects);
      Object.keys(projects).map((projectId: string) => {
        this.store.dispatch(TasksActions.fetchAllTasksOfProject({ projectId }));
      });
    });
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }

};
