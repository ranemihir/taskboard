import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from '../shared/guards/anonymous/anonymous.guard';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
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
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
