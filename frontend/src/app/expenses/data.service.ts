import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
interface FormData {
  description: string;
  category: string;
  date: string;
  amount: number;
}
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8085/spendwise/expense';
 
  constructor(private http: HttpClient) { }
 
  addExpense(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData);
  }
 
  updateExpense(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, formData);
  }
 
  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}