/* NgRx */
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ExpenseState} from './expense.reducer';

// Selector functions
const stateData =
  createFeatureSelector<ExpenseState>('expense-tracker.expense');

export const expenseInfo = createSelector(
  stateData,
  (state: ExpenseState) => state.expenseInfo
);
