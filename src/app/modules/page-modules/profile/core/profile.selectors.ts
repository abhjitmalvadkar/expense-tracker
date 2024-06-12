/* NgRx */
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from './profile.reducer';

// Selector functions
const stateData =
  createFeatureSelector<ProfileState>('expense-tracker.profile');

export const userDetailsInfo = createSelector(
  stateData,
  (state: ProfileState) => state.userDetailsInfo
);

export const profile = createSelector(stateData, (state: ProfileState) => state.userDetailsInfo);
