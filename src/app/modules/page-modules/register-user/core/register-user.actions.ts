/* NgRx */
import {createAction, props} from '@ngrx/store';

/******** CLEAR STATE ***********/
const CLEAR_STATE = '[register-user] clear state';
export const ClearState = createAction(CLEAR_STATE);

/*********** REGISTER USER **************/
const REGISTER_USER_REQUEST = '[register-user] update profile details requested';
export const RegisterUserRequest = createAction(REGISTER_USER_REQUEST, props<any>());

const REGISTER_USER_SUCCESS = '[register-user] update profile details successful';
export const RegisterUserSuccess = createAction(REGISTER_USER_SUCCESS, props<any>());

const REGISTER_USER_FAILURE = '[register-user] update profile details failure';
export const RegisterUserFailure = createAction(REGISTER_USER_FAILURE, props<any>());
