import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Expense } from '../models/expense';
import { EXPENSES } from '../mock-expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor() {}

  getExpenses(): Observable<Expense[]> {
    return of(EXPENSES);
  }
}
