import { Component, OnInit } from '@angular/core';
import * as ProjectsSelectors from './../taskboard/state/projects/projects.selectors';
import { Observable } from 'rxjs';
import { CurrentUser, Project } from './../shared/types';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/state';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects$: Observable<{ [key: string]: Omit<Project, "_id">; }>;

  constructor(
    private store: Store<AppState>
  ) {
    this.projects$ = this.store.select(ProjectsSelectors.getAllProjectsOfCurrentUser);
  }

  ngOnInit(): void {
  }

}
