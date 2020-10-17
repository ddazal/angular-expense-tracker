import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  date: string;
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
      this.date = this.parseDate(expense.date);
    });
  }

  onSubmit(): void {
    const { expense } = this.editExpenseForm.value;
    if (expense) {
      const { description, amount, date } = expense;
      this.expensesService
        .updateExpense(this.id, description, amount, new Date(date).getTime())
        .subscribe(() => {
          this.editExpenseForm.reset();
          this.router.navigate([''], { state: { edited: true } });
        });
    }
    this.router.navigate(['']);
  }

  private parseDate(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.addLeadingZero(month)}-${this.addLeadingZero(day)}`;
  }

  private addLeadingZero(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
}
