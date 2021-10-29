import { NgModule } from '@angular/core';
import { TaskboardComponent } from './taskboard.component';
import { TaskboardRoutingModule } from './taskboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';

//reducers
import { projectsReducer } from './state/projects/projects.reducer';
import { projectRolesReducer } from './state/project_roles/project_roles.reducer';
import { tasksReducer } from './state/tasks/tasks.reducer';


@NgModule({
  declarations: [
    TaskboardComponent
  ],
  imports: [
    SharedModule,
    TaskboardRoutingModule,
    StoreModule.forFeature('projects', projectsReducer),
    StoreModule.forFeature('projectRoles', projectRolesReducer),
    StoreModule.forFeature('tasks', tasksReducer)
  ]
})
export class TaskboardModule { }
