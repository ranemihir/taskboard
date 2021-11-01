import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import { CurrentUser, Project } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
import * as UserSelectors from '../../../auth/state/current_user/current_user.selectors';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  currentUserId?: string | null;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) {
    this.store.select(UserSelectors.getId).subscribe((currentUserId: string | null) => {
      if (currentUserId && currentUserId != null) {
        this.currentUserId = currentUserId;
      }
    });
  }

  fetchAllProjectsOfCurrentUser() {
    return this.http.get<Project[]>(environment.apiUrl + '/projects/' + this.currentUserId);
  }

  fetch(projectId: string) {

    return this.http.get<Project>(environment.apiUrl + '/projects/' + projectId);
  }

  createProject(name: string, description?: string) {
    return this.http.post<Project>(environment.apiUrl + '/projects/0/create', {
      name,
      description,
      adminUserIds: [this.currentUserId]
    });
  }

  updateProject(_id: string, name?: string, description?: string, adminUserIds?: string[], invites?: string[]) {
    return this.http.post<Project>(environment.apiUrl + `/projects/${_id}/update`, {
      name,
      description,
      adminUserIds,
      invites
    });
  }

  deleteProject(_id: string) {
    return this.http.post<string>(environment.apiUrl + `/projects/${_id}/delete`, {});
  }
}
