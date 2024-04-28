import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  signUpObj : SignUp = new SignUp();

  onRegister() {
    const localUser = localStorage.getItem('registered_users');
    if(localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('registered_users', JSON.stringify(users))
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('registered_users', JSON.stringify(users))
    }
    alert('Registration Successful')
  }
}

export class SignUp {
  name: string;
  email:string;
  password:string;
  

  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    
  }
}
