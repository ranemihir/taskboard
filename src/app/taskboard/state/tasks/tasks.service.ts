import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import * as UserSelectors from '../../../auth/state/current_user/current_user.selectors';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  headers: HttpHeaders;
  currentUserId?: string;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.store.select(UserSelectors.getCurrentUserId).subscribe((currentUserId?: string | null) => {
      if (currentUserId && currentUserId != null) {
        this.currentUserId = currentUserId;
      }
    });
  }

  fetchAllTasksAssignedToCurrentUserFromAllProjects() {
    return this.http.get<Task[]>(`/assigned_tasks`, {
      headers: this.headers
    });
  }

  fetchTasksOfProject(projectId: string) {
    return this.http.get<Task[]>(`/projects/${projectId}/tasks`, {
      headers: this.headers
    });
  }

  createTask(projectId: string, title: string, statusId: string) {
    return this.http.post<Task>(`/projects/${projectId}/tasks/0/create`, {
      title,
      statusId
    }, {
      headers: this.headers
    });
  }

  updateTask(_id: string, projectId: string, title?: string, statusId?: string, dueDate?: string, priority?: string, assignedTo?: string) {
    return this.http.post<Task>(`/projects/${projectId}/tasks/${_id}/update`, {
      title,
      statusId,
      dueDate,
      priority,
      assignedTo
    }, {
      headers: this.headers
    });
  }

  deleteTask(_id: string, projectId: string) {
    return this.http.post<string>(`/projects/${projectId}/tasks/${_id}/delete`, {}, {
      headers: this.headers
    });
  }
}
