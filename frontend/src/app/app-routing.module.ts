import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { EditingComponent } from './expenses/editing/editing.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { AddComponent } from './expenses/add/add.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path:'spendwise/register/users', component: RegistrationComponent},
    { path:'spendwise/login', component: LoginComponent},
    {path:'spendwise/expense/edit',component:EditingComponent},
    {path:'spendwise/expense/add',component:AddComponent},
    {path:'spendwise/expense/list',component:ExpenseListComponent},
    {path:'spendwise/expense/list',component:HomeComponent},
    {path:'spendwise/home',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
