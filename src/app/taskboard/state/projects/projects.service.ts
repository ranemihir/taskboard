import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import { Project } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
import * as UserSelectors from '../../../auth/state/current_user/current_user.selectors';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  headers: HttpHeaders;
  currentUserId?: string;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.store.select(UserSelectors.getCurrentUserId).subscribe((currentUserId?: string | null) => {
      if (currentUserId && currentUserId != null) {
        this.currentUserId = currentUserId;
      }
    });
  }

  fetchAllProjectsOfCurrentUser() {
    return this.http.get<Project[]>(environment.apiUrl + '/projects/' + this.currentUserId, {
      headers: this.headers
    });
  }

  create(name: string, description?: string) {
    return this.http.post<Project>(environment.apiUrl + '/projects/0/create', {
      name,
      description,
      adminUserIds: [this.currentUserId]
    }, {
      headers: this.headers
    });
  }

  update(_id: string, name?: string, description?: string, adminUserIds?: string[]) {
    return this.http.post<Project>(environment.apiUrl + `/projects/${_id}/update`, {
      name,
      description,
      adminUserIds
    }, {
      headers: this.headers
    });
  }

  delete(_id: string) {
    return this.http.post<string>(environment.apiUrl + `/projects/${_id}/delete`, {}, {
      headers: this.headers
    });
  }
}
