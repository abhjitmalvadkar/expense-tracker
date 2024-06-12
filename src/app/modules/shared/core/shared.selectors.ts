/* NgRx */
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SharedState} from './shared.reducer';

// Selector functions
const sharedData =
  createFeatureSelector<SharedState>('expense-tracker.shared');

export const isLoading = createSelector(
  sharedData,
  state => state.loading
);
export const screenType = createSelector(sharedData, (state: SharedState) => state.screenType);

export const exchangeRates = createSelector(
  sharedData,
  (state) => state.exchangeRates
);
