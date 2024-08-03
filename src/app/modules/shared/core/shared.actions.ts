/* NgRx */
import {createAction, props} from '@ngrx/store';

/******** CLEAR STATE ***********/
const CLEAR_STATE = '[shared] clear state';
export const ClearState = createAction(CLEAR_STATE);

/******** SET SCREEN TYPE ***********/
const SET_SCREEN_TYPE = '[shared] set screen type';
export const SetScreenType = createAction(SET_SCREEN_TYPE, props<{
  screenType: 'mobile' | 'tablet' | 'desktop' | ''
}>());

/******** LOADING ***********/
const START_LOADING = '[shared] start loading';
export const StartLoading = createAction(START_LOADING);

const STOP_LOADING = '[shared] stop loading';
export const StopLoading = createAction(STOP_LOADING);

const CLEAR_LOADING = '[shared] clear loading';
export const ClearLoading = createAction(CLEAR_LOADING);

/******** FETCH EXCHANGE RATES ***********/
const FETCH_EXCHANGE_RATES_REQUEST = '[shared] fetch exchange rates request';
export const FetchExchangeRatesRequest = createAction(FETCH_EXCHANGE_RATES_REQUEST, props<any>());

const FETCH_EXCHANGE_RATES_SUCCESS = '[shared] fetch exchange rates success';
export const FetchExchangeRatesSuccess = createAction(FETCH_EXCHANGE_RATES_SUCCESS, props<any>());

const FETCH_EXCHANGE_RATES_FAILURE = '[shared] fetch exchange rates failure';
export const FetchExchangeRatesFailure = createAction(FETCH_EXCHANGE_RATES_FAILURE, props<any>());

/*********** SET PROFILE **************/
const SET_PROFILE = '[shared] set  profile requested';
export const SetProfile = createAction(SET_PROFILE, props<any>());
