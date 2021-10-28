import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StoreModule } from '@ngrx/store';
import { currentUserReducer } from './state/current_user/current_user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CurrentUserEffects } from './state/current_user/current_user.effects';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature('currentUser', currentUserReducer),
    EffectsModule.forFeature([CurrentUserEffects])
  ]
})
export class AuthModule { }
