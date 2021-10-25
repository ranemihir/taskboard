import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUser } from '../shared/types/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<CurrentUser>(environment.apiUrl + '/signup', {
      firstName,
      lastName,
      email,
      password
    }, {
      headers: this.headers
    });
  }

  login(email: string, password: string) {
    return this.http.post<CurrentUser>(environment.apiUrl + '/login', {
      email,
      password
    }, {
      headers: this.headers
    });
  }
};
