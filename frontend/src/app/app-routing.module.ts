import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { EditingComponent } from './expenses/editing/editing.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { AddComponent } from './expenses/add/add.component';

const routes: Routes = [
    {path:'spendwise/register/users', component: RegistrationComponent},
    { path:'spendwise/login', component: LoginComponent},
    {path:'spendwise/expense/edit',component:EditingComponent},
    {path:'spendwise/expense/list',component:ExpenseListComponent},
    {path:'spendwise/expense/add',component:AddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
