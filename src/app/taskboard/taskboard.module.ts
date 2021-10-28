import { NgModule } from '@angular/core';
import { TaskboardComponent } from './taskboard.component';
import { TaskboardRoutingModule } from './taskboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { projectsReducer } from './state/projects/projects.reducer';
import { projectRolesReducer } from './state/projects/projects.reducer';
import { tasksReducer } from './state/projects/projects.reducer';


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
