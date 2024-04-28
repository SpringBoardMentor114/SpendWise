import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
})
export class EditingComponent {
  formData = {
    description: 'Default Description',
    category: 'Food',
    date: '2024-04-30', 
    amount: 10
  };

  showAlert = false;
  successAlert = false;

  constructor(private notification: NzNotificationService, private router: Router) {} 

  saveData() {
    if (this.validateForm()) {
      const savedData = { ...this.formData };
      console.log('Form data is valid. Saving data:', savedData);

      // Show success notification
      this.notification.success('Success', 'Successfully Edit.');

      setTimeout(() => {
        this.successAlert = false;
      }, 3000); // Hide success alert after 3 seconds
      this.router.navigateByUrl('/spendwise/expense/list');

    } else {
      this.showAlert = true;
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  validateForm(): boolean {
    let isValid = true;

    // Validate description
    if (this.formData.description.trim().length < 3) {
      isValid = false;
    }

    // Validate category
    if (this.formData.category === '') {
      isValid = false;
    }

    // Validate date
    if (!this.formData.date) { // Assuming date should not be empty
      isValid = false;
    }

    // Validate amount
    if (isNaN(this.formData.amount) || this.formData.amount <= 0) {
      isValid = false;
    }

    return isValid;
  }
}
