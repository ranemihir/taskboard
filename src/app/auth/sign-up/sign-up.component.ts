import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import * as CurrentUserActions from '../state/current_user/current_user.actions';


function passwordMatcher(c: AbstractControl): { [key: string]: boolean; } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPasswordControl?.pristine) {
    return null;
  }

  if (passwordControl?.value === confirmPasswordControl?.value) {
    return null;
  }

  return { 'match': true };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      }, {
        validator: passwordMatcher
      })
    });
  }

  ngOnInit(): void {

  }

  signUp() {
    const { firstName, lastName, email, passwordGroup } = this.signupForm.value;
    const { password } = passwordGroup;

    this.store.dispatch(CurrentUserActions.signUp({ firstName, lastName, email, password }));
  }

}
