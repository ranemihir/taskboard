import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardResolver } from './dashboard/dashboard.resolver';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnonymousGuard } from './shared/guards/anonymous/anonymous.guard';
import { AuthGuard } from './shared/guards/auth/auth.guard';

function getHomeComponent() {
  if (AuthGuard.prototype.canActivate) {
    return DashboardComponent;
  } else {
    return LandingPageComponent;
  }
}

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      projects: DashboardResolver
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
