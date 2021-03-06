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

  fetchProjectRole(projectId: string, projectRoleId: string) {
    return this.http.get<ProjectRole>(environment.apiUrl + `/projects/${projectId}/project_roles/${projectRoleId}`);
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

  acceptProjectRoleInvitation(projectId: string) {
    return this.http.post<ProjectRole>(environment.apiUrl + `/projects/${projectId}/accept_invitation`, {
      projectId,
    });
  }

  deleteProjectRole(_id: string) {
    return this.http.post<string>(environment.apiUrl + `/projectRoles/${_id}/delete`, {});
  }
}
