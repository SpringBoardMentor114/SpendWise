
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
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { EditingComponent } from './expenses/editing/editing.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


import { ExpenseManagementDashboardAppComponent } from './expenses/expense-management-dashboard-app/expense-management-dashboard-app.component';

import { ReactiveFormsModule } from '@angular/forms';
// import { HomeComponent } from './home/home.component'; 
import { AddComponent } from './expenses/add/add.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

registerLocaleData(en);

const routes: Routes = [
  {path:'', redirectTo:'Login',pathMatch:'full'} ,
  {path:'Registration',component:RegistrationComponent},
  {path:'PassReset',component:PassresetComponent},
  {path:'Login',component:LoginComponent},
  {path:'**',component:LoginComponent},
  {path:'EDIT',component:EditingComponent}

  // {path:'Home',component:HomeComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PassresetComponent,
    CMIComponent,
    LoggingComponent,
    ExpenseListComponent,
    EditingComponent,
    AddComponent,
   ExpenseManagementDashboardAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxChartsModule,

    MatTableModule,
    MatPaginatorModule,
    
    HttpClientModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
