
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ Routes,RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PassresetComponent } from './passreset/passreset.component';
import { CMIComponent } from './cmi/cmi.component';
import { LoggingComponent } from './expenses/logging/logging.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { EditingComponent } from './expenses/editing/editing.component';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'', redirectTo:'Login',pathMatch:'full'} ,
  {path:'Registration',component:RegistrationComponent},
  {path:'PassReset',component:PassresetComponent},
  {path:'Login',component:LoginComponent},
  {path:'**',component:LoginComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PassresetComponent,
    CMIComponent,
    PasswordResetComponent,
    LoggingComponent,
    ExpenseListComponent,
    EditingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }