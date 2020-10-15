import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
})
export class ExpensesListComponent implements OnInit {
  expenses: Expense[];

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expensesService
      .getExpenses()
      .subscribe((expenses) => (this.expenses = expenses));
  }
}
