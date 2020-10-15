import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent implements OnInit {
  @Input() expense: Expense;

  constructor() { }

  ngOnInit(): void {
  }


}
