/* NgRx */
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RegisterUserState} from './register-user.reducer';

// Selector functions
const stateData =
  createFeatureSelector<RegisterUserState>('expense-tracker.register-user');


export const loading = createSelector(
  stateData,
  (state: RegisterUserState) => state.loading
)

export const currencyFilter = createSelector(
  stateData,
  (state: RegisterUserState) => state.currencyFilter
);
