import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from '../shared/guards/anonymous/anonymous.guard';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AnonymousGuard]
    },
    {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [AnonymousGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
