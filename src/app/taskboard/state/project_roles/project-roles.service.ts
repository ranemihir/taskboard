import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectRole } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectRolesService {

  constructor(
    private http: HttpClient
  ) {
  }

  fetchAllProjectRolesOfProject(projectId: string) {
    return this.http.get<ProjectRole[]>(
      environment.apiUrl + `/projects/${projectId}/project_roles`);
  }

  updateProjectRole(_id: string, authorisedStatusIds: string[]) {
    return this.http.post<ProjectRole>(environment.apiUrl + `/projectRoles/${_id}/update`, {
      authorisedStatusIds
    });
  }

  deleteProjectRole(_id: string) {
    return this.http.post<string>(environment.apiUrl + `/projectRoles/${_id}/delete`, {});
  }
}
