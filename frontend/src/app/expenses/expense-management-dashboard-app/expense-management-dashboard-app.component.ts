import { Component, OnInit } from '@angular/core';
import { Category, DataService, Expense } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
 
interface FormData {
  description: string;
  category: Category | null;
  date: string;
  amount: number | null;
}
 
 
@Component({
  selector: 'app-expense-management-dashboard-app',
  templateUrl: './expense-management-dashboard-app.component.html',
  styleUrls: ['./expense-management-dashboard-app.component.css']
})
export class ExpenseManagementDashboardAppComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  pageSizeOptions: number[] = [5, 10, 15];
  itemsPerPage = 10;
  currentPage = 0;
  totalItems = 0;
  startDate?: string;
  endDate?: string;
  categories: Category[] = [];
  formData: FormData = {
    description: '',
    category: null,
    date: '',
    amount: null,
  };
 
 
  constructor(private dataService: DataService,
     private router: Router,
      private http: HttpClient,
        private route: ActivatedRoute // Add ActivatedRoute to your imports
) {}
 
  ngOnInit(): void {
    this.loadAllExpenses();
    this.loadCategories();
 
  }
 
  loadAllExpenses(): void {
    this.dataService.getExpenses().subscribe(data => {
      console.log(data);
      this.expenses = data;
 
      this.applyFilters();
 
      this.expenses.forEach(expense => {
        let expenseId = expense.expenseId;
        console.log('Expense ID:', expenseId);
 
      });
 
    });
  }
 
  loadCategories(): void {
    this.dataService.getCategories().subscribe(data => {
      this.categories = data;
 
      this.categories.forEach(expense => {
        let categoryId=expense.categoryId;
        console.log('Category ID:',categoryId);
 
      });
    });
  }
 
  applyFilters(): void {
    let filtered = this.expenses;
 
    if (this.formData.category !== null) {
      filtered = filtered.filter(expense => expense.category.categoryId === (this.formData.category! as Category).categoryId);
      console.log('Category ID:', this.formData.category);
    }
 
  if (this.startDate) {
    console.log('Start Date:', this.startDate);
    filtered = filtered.filter(expense => new Date(expense.date) >= new Date(this.startDate!));
  }
 
  if (this.endDate) {
    console.log('End Date:', this.endDate);
    const endDate = new Date(this.endDate!);
    endDate.setDate(endDate.getDate() + 1);
    filtered = filtered.filter(expense => new Date(expense.date) < endDate);
  }
 
    this.filteredExpenses = filtered;
    this.totalItems = filtered.length;
    this.paginateExpenses();
  }
 
  paginateExpenses(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredExpenses = this.filteredExpenses.slice(start, end);
  }
 
  deleteExpense(expenseId: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.dataService.deleteExpense(expenseId).subscribe({
        next: () => {
          console.log('Expense deleted successfully');
          this.loadAllExpenses();
        },
        error: (error: any) => {
          console.error('Error deleting expense', error);
        }
      });
    }
  }
 
  editExpense(expenseId: number): void {
    this.dataService.getExpenses().subscribe(
      (expenses) => {
        const selectedExpense = expenses.find(expense => expense.expenseId === expenseId);
        if (selectedExpense) {
          this.router.navigate(['spendwise/expense/edit', expenseId], { state: { expense: selectedExpense } });
        } else {
          console.error('Expense not found');
        }
      },
      (error: any) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }
  changeItemsPerPage(newSize: number): void {
    this.itemsPerPage = newSize;
    this.currentPage = 0; // Reset to first page
    this.applyFilters();
  }
 
  changePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.applyFilters();
  }
}  
