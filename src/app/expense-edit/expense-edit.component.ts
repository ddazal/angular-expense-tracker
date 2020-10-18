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
    this.expensesService
      .getExpenseById(this.id)
      .subscribe((expense: Expense) => {
        const { description, amount, date } = expense;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.editExpenseForm.patchValue({
          expense: {
            description,
            amount,
            date: this.parseDate(new Date(date)),
          },
        });
      });
  }

  onSubmit(): void {
    const { expense } = this.editExpenseForm.value;
    if (expense) {
      const { description, amount, date } = expense;
      const update = {
        description,
        amount,
        date: new Date(date),
      };
      this.expensesService.updateExpense(this.id, update).subscribe(() => {
        this.editExpenseForm.reset();
        this.router.navigate([''], { state: { edited: true } });
      });
    }
    this.router.navigate(['']);
  }

  private parseDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.addLeadingZero(month)}-${this.addLeadingZero(day)}`;
  }

  private addLeadingZero(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
}
