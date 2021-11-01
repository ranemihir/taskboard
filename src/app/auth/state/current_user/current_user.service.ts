import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUser, ProjectRole } from "src/app/shared/types";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http: HttpClient) { }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<CurrentUser>(environment.apiUrl + '/signup', {
      firstName,
      lastName,
      email,
      password
    });
  }

  login(email: string, password: string) {
    return this.http.post<CurrentUser>(environment.apiUrl + '/login', {
      email,
      password
    });
  }

  acceptProjectRoleInvitation(projectId: string) {
    return this.http.post<ProjectRole>(environment.apiUrl + `/projects/${projectId}/accept_invitation`, {
      projectId,
    });
  }
};
