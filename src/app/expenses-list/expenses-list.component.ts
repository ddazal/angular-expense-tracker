import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../models/expense';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
})
export class ExpensesListComponent implements OnInit {
  expenses: Expense[];
  added = false;
  edited = false;

  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {
    const { state } = this.router.getCurrentNavigation().extras;
    this.added = !!(state && state.added);
    this.edited = !!(state && state.edited);
  }

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expensesService
      .getExpenses()
      .subscribe((expenses) => (this.expenses = expenses));
  }

  deleteExpense(id: string): void {
    const answer = confirm('Delete expense?');
    if (!answer) {
      return;
    }
    this.expensesService.deleteExpense(id);
  }
}
