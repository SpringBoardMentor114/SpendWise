import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../data.service';
 
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
 
  constructor(private notification: NzNotificationService, private router: Router, private http: HttpClient,   private dataService: DataService) {}
 
  saveData() {
    if (this.validateForm()) {
      let savedData = { ...this.formData };
      console.log('Form data is valid. Saving data:', savedData);
  
      // Replace expenseId with the actual ID of the expense you want to update
      const expenseId = 1;
  
      this.dataService.updateExpense(expenseId, savedData).subscribe(
        (resultData: any) => {
          console.log(resultData);
          if (resultData.status) {
            this.router.navigateByUrl('/spendwise/expense/list');
            this.notification.success('Success', 'Expense updated successfully');
          } else {
            this.notification.error('Error', 'Failed to update expense');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error occurred:', error);
          if (error.status === 0) {
            this.notification.error('Network Error', 'Unable to connect to the server. Please check your network connection.');
          } else {
            this.notification.error('Server Error', `An error occurred on the server: ${error.message}`);
          }
        }
      );
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