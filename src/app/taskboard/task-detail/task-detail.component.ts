import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { concat, Observable } from 'rxjs';
import { AppState } from 'src/app/shared/state';
import * as TasksSelectors from './../state/tasks/tasks.selectors';
import * as ProjectRolesSelectors from './../state/project_roles/project_roles.selectors';
import { ProjectRole, Task } from 'src/app/shared/types';
import { concatMap, debounceTime, map, mergeMap, skip } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as TasksActions from 'src/app/taskboard/state/tasks/tasks.actions';
import EditorJS from '@editorjs/editorjs';
import editorjsConfig from './editor.config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  avatarUrl: string = environment.avatarUrl;
  data$: Observable<{ task: Task, projectRole: ProjectRole; }>;

  editor: EditorJS;
  editorData: any;
  editorObserver: MutationObserver;

  constructor(
    private store: Store<AppState>
  ) {
    this.data$ = this.store.select(TasksSelectors.getTask).pipe(
      mergeMap((task: Task) => {
        return this.store.select(ProjectRolesSelectors.getProjectRoleFactorySelector(task.assignedTo)).pipe(
          map((projectRole: ProjectRole) => ({
            task,
            projectRole
          }))
        );
      })
    );
  }

  ngOnInit(): void {
    this.editor = new EditorJS(editorjsConfig);

    this.detectEditorChanges().pipe(
      debounceTime(200),
      skip(1),
      untilDestroyed(this)
    ).subscribe(data => {
      this.editor.save().then((outputData) => {
        this.editorData = JSON.stringify(outputData, null, 2);
      });
    });
  }

  saveEditorData(): void {
    this.editor.save().then((outputData) => {
      this.editorData = JSON.stringify(outputData, null, 2);
    });
  }

  ngOnDestroy(): void {
    this.editorObserver.disconnect();
  }

  detectEditorChanges(): Observable<any> {
    return new Observable(observer => {

      const editorDom = document.querySelector('#editorjs');
      const config = { attributes: true, childList: true, subtree: true };

      this.editorObserver = new MutationObserver((mutation) => {
        observer.next(mutation);
      });

      this.editorObserver.observe(editorDom, config);

    });
  }


}
