import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Expense } from '../models/expense';
import { EXPENSES } from '../mock-expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  expenses: Expense[] = EXPENSES;
  constructor() {}

  getExpenses(): Observable<Expense[]> {
    return of(this.expenses.sort((a, b) => b.date - a.date));
  }

  addExpense(
    description: string,
    amount: number,
    date: number
  ): Observable<Expense> {
    const id = uuidv4();
    const expense: Expense = {
      id,
      description,
      amount,
      date,
    };
    this.expenses.push(expense);
    return of(this.expenses[this.expenses.length - 1]);
  }
}
