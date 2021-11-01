import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import { Project } from 'src/app/shared/types';
import * as ProjectsActions from './../state/projects/projects.actions';
import * as ProjectsSelectors from './../state/projects/projects.selectors';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  project?: Project;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.dispatch(ProjectsActions.fetchProject({ _id: '617ce5f9fc13ae5fcf00007d' }));
  }

  ngOnInit(): void {
    this.store.select(ProjectsSelectors.getProject).subscribe(project => {
      this.project = project;
      console.log(`project: ${project}`);
    });
  }

}
