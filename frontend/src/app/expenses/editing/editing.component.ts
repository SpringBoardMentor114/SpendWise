import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../data.service';
 
@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent {
  formData = {
    description: 'Default Description',
    category: 'Food',
    date: '2024-04-30',
    amount: 10
  };
 
 
  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {}
 
  saveData() {
    if (this.validateForm()) {
      const savedData = JSON.parse(JSON.stringify(this.formData)); 
      console.log('Form data is valid. Saving data:', savedData);
 
      const expenseId = 1;

      this.dataService.updateExpense(expenseId, savedData).subscribe(
        (response: any) => {
          if (response.status) {
            this.router.navigateByUrl('/spendwise/expense/list');
            this.notification.success('Success', 'Expense updated successfully');
          } else {
            this.notification.error('Error', response.error || 'An error occurred while updating the expense');
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
    
 else {
  this.notification.error('Error', 'Please fill all the fields correctly');
}
  }
 
 
 
  validateForm(): boolean {
    let isValid = true;
    if (this.formData.description.trim().length < 3) {
      isValid = false;
    }
    if (this.formData.category === '') {
      isValid = false;
    }
    if (!this.formData.date) {
      isValid = false;
    }
    if (isNaN(this.formData.amount) || this.formData.amount <= 0) {
      isValid = false;
    }
    return isValid;
  }
} 