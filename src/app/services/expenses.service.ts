import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Expense } from '../models/expense';
import { EXPENSES } from '../mock-expenses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  expenses: Expense[] = EXPENSES;
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(environment.apiUrl);
  }

  addExpense(
    description: string,
    amount: number,
    date: Date
  ): Observable<Expense> {
    return this.http.post<Expense>(environment.apiUrl, {
      description,
      amount,
      date,
    });
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${environment.apiUrl}/${id}`);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }

  updateExpense(
    id: string,
    expense: { description: string; amount: number; date: Date }
  ): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/${id}`, expense);
  }
}
