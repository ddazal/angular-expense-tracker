import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';

const routes: Routes = [
  { path: '', component: ExpensesListComponent },
  { path: 'add', component: ExpenseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
