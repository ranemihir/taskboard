import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: this.fb.control(''),
    password: this.fb.control('')
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
