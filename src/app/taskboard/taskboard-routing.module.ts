import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardResolver } from '../dashboard/dashboard.resolver';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { ProjectResolver } from './kanban-board/kanban-board.project.resolver';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskDetailResolver } from './task-detail/task-detail.resolver';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        resolve: {
            projects: DashboardResolver
        }
    },
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
        component: TaskDetailComponent,
        resolve: {
            taskData: TaskDetailResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskboardRoutingModule { }
