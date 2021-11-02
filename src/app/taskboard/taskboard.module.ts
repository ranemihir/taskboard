import { NgModule } from '@angular/core';
import { TaskboardRoutingModule } from './taskboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';

//reducers
import { projectsReducer } from './state/projects/projects.reducer';
import { projectRolesReducer } from './state/project_roles/project_roles.reducer';
import { tasksReducer } from './state/tasks/tasks.reducer';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { ProjectsEffects } from './state/projects/projects.effects';
import { ProjectRolesEffects } from './state/project_roles/project_roles.effects';
import { TasksEffects } from './state/tasks/tasks.effects';
import { EffectsModule } from '@ngrx/effects';
import { hydrationMetaReducer } from '../shared/meta-reducers/hydration.meta-reducer';


@NgModule({
  declarations: [
    TaskDetailComponent,
    KanbanBoardComponent
  ],
  imports: [
    SharedModule,
    TaskboardRoutingModule,
    StoreModule.forFeature('projects', projectsReducer, {
      metaReducers: [hydrationMetaReducer('projects')]
    }),
    StoreModule.forFeature('projectRoles', projectRolesReducer, {
      metaReducers: [hydrationMetaReducer('projectRoles')]
    }),
    StoreModule.forFeature('tasks', tasksReducer, {
      metaReducers: [hydrationMetaReducer('tasks')]
    }),
    EffectsModule.forFeature([
      ProjectsEffects,
      ProjectRolesEffects,
      TasksEffects
    ])
  ]
})
export class TaskboardModule { }
