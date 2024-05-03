
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';


// const routes: Routes = [
//   {
//     path: 'spendwise/register/users',component: RegistrationComponent},
//     { path: 'spendwise/home', component: HomeComponent },

//   { path:'spendwise/login', component: LoginComponent},


// ];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

