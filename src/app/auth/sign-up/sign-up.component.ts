import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
    email: this.fb.control(''),
    password: this.fb.control(''),
    confirmPassword: this.fb.control('')
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

}
