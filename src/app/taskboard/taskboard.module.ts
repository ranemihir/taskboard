import { NgModule } from '@angular/core';
import { TaskboardComponent } from './taskboard.component';
import { TaskboardRoutingModule } from './taskboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TaskboardComponent
  ],
  imports: [
    SharedModule,
    TaskboardRoutingModule,
    // StoreModule.forFeature()
  ]
})
export class TaskboardModule { }
