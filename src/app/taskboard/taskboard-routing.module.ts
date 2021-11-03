import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { ProjectResolver } from './state/projects/project.resolver';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
    {
        path: ':projectId',
        component: KanbanBoardComponent,
        canActivate: [AuthGuard],
        resolve: {
            project: ProjectResolver
        }
    },
    {
        path: ':projectId/:taskId',
        component: TaskDetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskboardRoutingModule { }
