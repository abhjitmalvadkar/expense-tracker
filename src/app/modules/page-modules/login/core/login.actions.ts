/* NgRx */
import {createAction, props} from '@ngrx/store';

/******** CLEAR STATE ***********/
const CLEAR_STATE = '[login page] clear state';
export const ClearState = createAction(CLEAR_STATE);

/******** LOGIN ***********/
const LOGIN_REQUEST = '[login page] login requested';
export const LoginRequest = createAction(LOGIN_REQUEST, props<{ payload: any }>());

const LOGIN_SUCCESS = '[login page] login successful';
export const LoginSuccess = createAction(LOGIN_SUCCESS, props<any>());

const LOGIN_FAILURE = '[login page] login failure';
export const LoginFailure = createAction(LOGIN_FAILURE, props<any>());
