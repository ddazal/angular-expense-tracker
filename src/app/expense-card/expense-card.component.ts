import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css'],
})
export class ExpenseCardComponent implements OnInit {
  @Input() expense: Expense;
  @Output() deleteExpenseEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  deleteExpense(id: string): void {
    this.deleteExpenseEvent.emit(id);
  }
}
