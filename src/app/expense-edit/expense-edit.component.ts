import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../models/expense';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css'],
})
export class ExpenseEditComponent implements OnInit {
  private id: string;
  description: string;
  amount: number;
  date: Date;
  editExpenseForm: FormGroup = new FormGroup({
    expense: new FormControl(),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private expensesService: ExpensesService
  ) {}

  ngOnInit(): void {
    this.getExpense();
  }

  getExpense(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.expensesService.getExpenseById(this.id).subscribe((expense) => {
      this.description = expense.description;
      this.amount = expense.amount;
      this.date = expense.date;
    });
  }

  onSubmit(): void {
    const { expense } = this.editExpenseForm.value;
    if (expense) {
      const { description, amount, date } = expense;
      const update: Expense = {
        id: this.id,
        description: expense.description,
        amount: expense.amount,
        date: new Date(expense.date),
      };
      this.expensesService.updateExpense(update).subscribe(() => {
        this.editExpenseForm.reset();
        this.router.navigate([''], { state: { edited: true } });
      });
    }
    this.router.navigate(['']);
  }
}
