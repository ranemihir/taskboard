import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
    {
        path: ':projectId',
        component: KanbanBoardComponent
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
