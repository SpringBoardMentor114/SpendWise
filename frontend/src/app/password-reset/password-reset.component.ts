import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor() {}

  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      console.log(`Reset password for ${this.email} to ${this.newPassword}`);
      // Implement password reset logic here (e.g., API call)
      this.email = '';
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      console.log('New password and confirm password do not match.');
    }
  }
}
