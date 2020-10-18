import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css'],
})
export class ExpenseAddComponent implements OnInit {
  addExpenseForm: FormGroup = new FormGroup({
    expense: new FormControl(),
  });
  constructor(
    private router: Router,
    private expensesService: ExpensesService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { description, amount, date } = this.addExpenseForm.value.expense;
    this.expensesService
      .addExpense(description, amount, new Date(date))
      .subscribe(() => {
        this.addExpenseForm.reset();
        this.router.navigate([''], { state: { added: true } });
      });
  }
}
