import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {

  constructor(private router: Router) {}

  addItem() {
    // Redirect to the expense add route
    this.router.navigateByUrl('/spendwise/expense/add');
  }

  editItem() {
    console.log('Edit item clicked');
    this.router.navigateByUrl('/spendwise/expense/edit');

  }

}
