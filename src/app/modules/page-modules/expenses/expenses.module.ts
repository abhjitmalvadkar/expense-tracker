import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {AddOrUpdateExpenseComponent} from './components/add-or-update-expense/add-or-update-expense.component';
import {ExpenseScreenComponent} from "./screen/expense-screen.component";
import { ExpenseListTableComponent } from './components/expense-list-table/expense-list-table.component';
import { ExpenseListCardComponent } from './components/expense-list-card/expense-list-card.component';
import {SharedModule} from "../../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./core/expense.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ExpenseEffects} from "./core/expense.effects";


@NgModule({
  declarations: [
    ExpenseScreenComponent,
    AddOrUpdateExpenseComponent,
    ExpenseListTableComponent,
    ExpenseListCardComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    SharedModule,
    StoreModule.forFeature('expense-tracker.expense', reducer),
    EffectsModule.forFeature(
      [ExpenseEffects]
    ),
  ]
})
export class ExpensesModule {
}
