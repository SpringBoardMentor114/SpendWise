import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  subscription: Subscription | undefined;

  constructor(private authService: AuthserviceService, private router: Router) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onLogin() {
    this.subscription = this.authService.login(this.email, this.password).subscribe({
      next: response => {
        if(response.status == true){
          this.router.navigate(['/Home']);
        }
         else{
          alert("Email or password doesnt match");
         }
      },
    
   });
 }
}