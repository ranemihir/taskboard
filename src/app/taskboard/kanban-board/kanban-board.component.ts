import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/state';
import { Project, ProjectRole, Task } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
import * as ProjectsActions from './../state/projects/projects.actions';
import * as ProjectsSelectors from './../state/projects/projects.selectors';
import * as ProjectRolesSelectors from './../state/project_roles/project_roles.selectors';
import * as TasksSelectors from './../state/tasks/tasks.selectors';
import * as TasksActions from 'src/app/taskboard/state/tasks/tasks.actions';
import * as ProjectRolesActions from 'src/app/taskboard/state/project_roles/project_roles.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  project$: Observable<Project>;
  projectRolesMap: { [key: string]: ProjectRole; };
  tasksMap$: Observable<{ [key: string]: Task[]; }>;

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

    this.store.select(ProjectRolesSelectors.fetchAllProjectRolesOfProject).pipe(
      map((projectRoles: ProjectRole[]) => {
        const projectRolesMap: { [key: string]: ProjectRole; } = {};

        projectRoles.forEach((projectRole: ProjectRole) => {
          projectRolesMap[projectRole._id] = projectRole;
        });

        return projectRolesMap;
      })
    ).subscribe(projectRolesMap => {
      this.projectRolesMap = projectRolesMap;
    });

    this.tasksMap$ = this.store.select(TasksSelectors.getTasksOfProject).pipe(
      map((tasks: Task[]) => {
        // TODO: handle tasks with no status
        const tasksMap: { [key: string]: Task[]; } = {};

        tasks.forEach((task: Task) => {
          if (!(tasksMap.hasOwnProperty(task.statusId))) {
            tasksMap[task.statusId] = [];
          }

          tasksMap[task.statusId].push(task);
        });

        return tasksMap;
      })
    );

  }

  ngOnInit(): void {

  }

}
