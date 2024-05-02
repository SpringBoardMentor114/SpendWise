import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }
 
  addExpense(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/add`, formData, this.httpOptions);
  }
 
  updateExpense(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, formData , this.httpOptions);
  }
 
  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.httpOptions);
  }
}