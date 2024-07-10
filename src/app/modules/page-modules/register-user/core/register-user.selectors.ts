/* NgRx */
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RegisterUserState} from './register-user.reducer';

// Selector functions
const stateData =
  createFeatureSelector<RegisterUserState>('expense-tracker.profile');


export const loading = createSelector(
  stateData,
  (state: RegisterUserState) => state.loading
);
