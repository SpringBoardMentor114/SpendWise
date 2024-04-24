
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'spendwise/register/users',component: RegistrationComponent},
  {
    path: 'spendwise/password-reset',
    component: PasswordResetComponent
  },
  { path:'spendwise/login', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

