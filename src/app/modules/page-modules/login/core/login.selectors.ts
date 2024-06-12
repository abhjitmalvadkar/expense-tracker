/* NgRx */
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LoginState} from './login.reducer';

// Selector functions
const stateData =
  createFeatureSelector<LoginState>('expense-tracker.login');

export const loading = createSelector(
  stateData,
  (state: LoginState) => state.loading
);
