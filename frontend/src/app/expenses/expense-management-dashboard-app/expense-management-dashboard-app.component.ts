import { Component, OnInit,ViewChild  } from '@angular/core';
import { ExpensesService } from './expenses.services';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-management-dashboard-app',
  templateUrl: './expense-management-dashboard-app.component.html',
  styleUrls: ['./expense-management-dashboard-app.component.css']
})
export class ExpenseManagementDashboardAppComponent implements OnInit {
  expenses: any[] = [];
  paginatedExpenses: any[] = [];
  pageSizeOptions: number[] = [5, 10, 15];
  itemsPerPage = 10;
  currentPage = 1;
  selectedCategory = 'all';
  startDate!: string;
  endDate!: string;

  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private expensesService: ExpensesService,private router: Router) {
    
  }

  ngOnInit(): void {
    this.loadAllExpenses();
  }

  loadAllExpenses() {
    ['food', 'transport', 'utilities', 'entertainment', 'healthcare'].forEach(category => {
      this.expensesService.getExpenses(category).subscribe(data => {
        this.expenses = [...this.expenses, ...data];
        this.expenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      });
    });
  }

  filterExpenses() {
    if (this.selectedCategory !== 'all') {
      this.expensesService.getExpenses(this.selectedCategory).subscribe(data => {
        this.expenses = data.filter(item => new Date(item.date) >= new Date(this.startDate) && new Date(item.date) <= new Date(this.endDate));
      });
    } else {
      this.loadAllExpenses();
    }
  }
  

  deleteExpense(category: string, id: number) {
    if (confirm("Are you sure you want to delete this expense?")) {
      this.expensesService.deleteExpense(category, id).subscribe({
        next: (response) => {
          console.log('Expense deleted successfully');
          this.loadAllExpenses();  // Reload the list after deletion
        },
        error: (error) => {
          console.error('Error deleting expense', error);
        }
      });
    }
  }
  editExpense() {
    this.router.navigate(['spendwise/expense/edit']);
  }

  paginateExpenses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedExpenses = this.expenses.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginateExpenses();
  }

  changeItemsPerPage(num: number) {
    this.itemsPerPage = num;
    this.paginateExpenses();
  }
}
  
