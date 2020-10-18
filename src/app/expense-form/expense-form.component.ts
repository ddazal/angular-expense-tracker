import { Router } from '@angular/router';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExpenseFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExpenseFormComponent),
      multi: true,
    },
  ],
})
export class ExpenseFormComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input() title: string;
  @Input() description: string;
  @Input() amount: number;
  @Input() date: Date;
  expenseForm: FormGroup;
  onTouched: () => {};

  constructor(
    private fb: FormBuilder,
    private expensesService: ExpensesService,
    private router: Router
  ) {}

  writeValue(val: any): void {
    if (val) {
      this.expenseForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.expenseForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.expenseForm.disable() : this.expenseForm.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.expenseForm.valid ? null : { invalidForm: { valid: false } };
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      description: [this.description, Validators.required],
      amount: [this.amount, Validators.required],
      date: [this.date, Validators.required],
    });
  }
}
