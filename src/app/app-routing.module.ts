import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';

const routes: Routes = [
  { path: '', component: ExpensesListComponent },
  { path: 'add', component: ExpenseAddComponent },
  { path: 'edit/:id', component: ExpenseEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
