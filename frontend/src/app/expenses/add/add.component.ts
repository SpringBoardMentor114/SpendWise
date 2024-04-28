import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface FormData {
  description: string;
  category: string;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent {

  formData: FormData = {
    description: '',
    category: '',
    date: '',
    amount: 0
  };
submitted: any;

  constructor(private notification: NzNotificationService, private router: Router) {} 

  saveData() {
    if (this.validateForm()) {
      const savedData = { ...this.formData }; 
      console.log('Form data is valid. Saving data:', savedData);

      this.notification.success('Success', 'Expense added successfully');

      this.formData = {
        description: '',
        category: '',
        date: '',
        amount: 0
      };
      this.router.navigateByUrl('/spendwise/expense/list');
    } else {
      this.notification.error('Error', 'Please fill all the fields correctly');
    }
  }

  validateForm(): boolean {
    let isValid = true;

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
