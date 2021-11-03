import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import * as UserSelectors from '../../../auth/state/current_user/current_user.selectors';
import { Task } from "src/app/shared/types";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  currentUserId?: string;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.store.select(UserSelectors.getId).subscribe((currentUserId?: string | null) => {
      if (currentUserId && currentUserId != null) {
        this.currentUserId = currentUserId;
      }
    });
  }

  fetchAllTasksAssignedToCurrentUserFromAllProjects() {
    return this.http.get<Task[]>(environment.apiUrl + '/assigned_tasks');
  }

  fetchAllTasksOfProject(projectId: string) {
    return this.http.get<Task[]>(environment.apiUrl + `/projects/${projectId}/tasks`);
  }

  createTask(projectId: string, title: string, statusId: string) {
    return this.http.post<Task>(environment.apiUrl + `/projects/${projectId}/tasks/0/create`, {
      title,
      statusId
    });
  }

  updateTask(_id: string, projectId: string, title?: string, statusId?: string, dueDate?: string, priority?: string, assignedTo?: string) {
    return this.http.post<Task>(environment.apiUrl + `/projects/${projectId}/tasks/${_id}/update`, {
      title,
      statusId,
      dueDate,
      priority,
      assignedTo
    });
  }

  deleteTask(_id: string, projectId: string) {
    return this.http.post<string>(environment.apiUrl + `/projects/${projectId}/tasks/${_id}/delete`, {});
  }
}
