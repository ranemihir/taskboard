import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectRole } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectRolesService {
  headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  fetchAllProjectRolesOfProject(projectId: string) {
    return this.http.get<ProjectRole[]>(
      environment.apiUrl + `/projects/${projectId}/project_roles`,
      {
        headers: this.headers
      });
  }

  create(userId: string, projectId: string, authorisedStatusIds: string[]) {
    return this.http.post<ProjectRole>(environment.apiUrl + `/projectRoles/0/create`,
      {
        userId,
        projectId,
        authorisedStatusIds
      },
      {
        headers: this.headers
      });
  }

  update(_id: string, authorisedStatusIds: string[]) {
    return this.http.post<ProjectRole>(environment.apiUrl + `/projectRoles/${_id}/update`, {
      authorisedStatusIds
    }, {
      headers: this.headers
    });
  }

  delete(_id: string) {
    return this.http.post<string>(environment.apiUrl + `/projectRoles/${_id}/delete`, {}, {
      headers: this.headers
    });
  }
}
