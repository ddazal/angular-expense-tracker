import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseCardComponent,
    ExpensesListComponent,
    ExpenseFormComponent,
    ExpenseAddComponent,
    ExpenseEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
