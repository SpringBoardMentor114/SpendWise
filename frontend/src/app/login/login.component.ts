import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from './auth.service';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

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

  constructor(private authService: AuthserviceService, private router: Router,private userService:UserService) {}

  onLogin() {
    
      this.subscription = this.authService.login(this.email, this.password).subscribe({
        next: response => {

          if(response.status == true){
            this.userService.setUserEmail(this.email);
            this.router.navigate(['/Home']);
          }
           else{
            this.errorMessage = response.message;
            // alert("Email or password doesn't match!");
           }
          
        },
        error: error => {
          console.error('Login failed', error);
          this.errorMessage = "An error occurred during login";
        }
        
      });
    }
  
    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}
