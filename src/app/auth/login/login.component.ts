import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';

import * as CurrentUserActions from '../state/current_user/current_user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(CurrentUserActions.login({ email, password }));
  }

}
