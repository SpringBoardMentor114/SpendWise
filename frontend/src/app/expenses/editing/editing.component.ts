import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Category, DataService, Expense } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
  formData = {
    description: '',
    category: { categoryId: 0 },
    date: '',
    amount: 0
  };
  categories: Category[] = [];
  expenseId!: number;

  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.expenseId = params['id'];
      this.fetchExpenseDetails(this.expenseId);
    });

    this.dataService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchExpenseDetails(expenseId: number) {
    console.log('Fetching expense details for ID:', expenseId);
    this.dataService.getExpenseById(expenseId).subscribe(
      (expense: Expense) => {
        console.log('Expense details fetched:', expense);
        this.formData = {
          description: expense.description,
          category: { categoryId: expense.category.categoryId },
          date: expense.date,
          amount: expense.amount
        };
      },
      (error) => {
        console.error('Error fetching expense details:', error);
      }
    );
  }
  
  saveData() {
    if (this.validateForm()) {
      const savedData = JSON.parse(JSON.stringify(this.formData));
      console.log('Form data is valid. Saving data:', savedData);
  
      this.dataService.updateExpense(this.expenseId, savedData).subscribe(
        (response: any) => {
          console.log('Update response:', response);
          if (response.status) {
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
    } else {
      this.notification.error('Error', 'Please fill all the fields correctly');
    }
  }
  
  

  validateForm(): boolean {
    let isValid = true;
    if (this.formData.description.trim().length < 3) {
      isValid = false;
    }
    if (!this.formData.category.categoryId) {
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