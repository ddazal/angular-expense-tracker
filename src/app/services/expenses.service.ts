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
    const expenses = this.expenses.sort((a, b) => b.date - a.date);
    return of(expenses);
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

  getExpenseById(id: string): Observable<Expense> {
    const expense = this.expenses.find((e) => e.id === id);
    return of(expense);
  }

  deleteExpense(id: string): Observable<Expense> {
    const expenseIndex = this.expenses.findIndex((e) => e.id === id);
    const expense = this.expenses.splice(expenseIndex, 1);
    return of(expense[0]);
  }

  updateExpense(
    id: string,
    description: string,
    amount: number,
    date: number
  ): Observable<Expense> {
    const expenseIndex = this.expenses.findIndex((e) => e.id === id);
    const update = {
      ...this.expenses[expenseIndex],
      description,
      amount,
      date,
    };
    this.expenses.splice(expenseIndex, 1, update);
    return of(update);
  }
}
