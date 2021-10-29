import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskboardComponent } from './taskboard.component';

const routes: Routes = [
    {
        path: 'projects/:projectId',
        component: TaskboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskboardRoutingModule { }
