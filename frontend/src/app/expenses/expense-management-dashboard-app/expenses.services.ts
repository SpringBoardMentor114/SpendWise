import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://your-backend-api.com/api/expenses';
  
  getExpenses(category: string): Observable<any[]> {
    return this.http.get<any[]>(`assets/${category}.json`);
  }
  deleteExpense(category: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${category}/${id}`);
  }
}
