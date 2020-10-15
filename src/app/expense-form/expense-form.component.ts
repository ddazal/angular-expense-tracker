import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
})
export class ExpenseFormComponent implements OnInit {
  expenseForm = this.fb.group({
    description: ['', Validators.required],
    amount: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private expensesService: ExpensesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { description, amount, date } = this.expenseForm.value;
    this.expensesService
      .addExpense(description, amount, new Date(date).getTime())
      .subscribe((expense) => {
        this.expenseForm.reset();
        this.router.navigate([''], { state: { added: true } });
      });
  }
}
