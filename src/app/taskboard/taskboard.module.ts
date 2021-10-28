import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskboardComponent } from './taskboard.component';
import { TaskboardRoutingModule } from './taskboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    TaskboardComponent
  ],
  imports: [
    CommonModule,
    TaskboardRoutingModule,
    NgbModule,
  ]
})
export class TaskboardModule { }
