/* NgRx */
import {createAction, props} from '@ngrx/store';

/******** CLEAR STATE ***********/
const CLEAR_STATE = '[profile] clear state';
export const ClearState = createAction(CLEAR_STATE);

/*********** FETCH USER DETAILS **************/
const FETCH_USER_DETAILS_REQUEST = '[profile] fetch profile details requested';
export const FetchUserDetailsRequest = createAction(FETCH_USER_DETAILS_REQUEST, props<any>());

const FETCH_USER_DETAILS_SUCCESS = '[profile] fetch profile details successful';
export const FetchUserDetailsSuccess = createAction(FETCH_USER_DETAILS_SUCCESS, props<any>());

const FETCH_USER_DETAILS_FAILURE = '[profile] fetch profile details failure';
export const FetchUserDetailsFailure = createAction(FETCH_USER_DETAILS_FAILURE, props<any>());

/*********** UPDATE USER DETAILS **************/
const UPDATE_USER_DETAILS_REQUEST = '[profile] update profile details requested';
export const UpdateUserDetailsRequest = createAction(UPDATE_USER_DETAILS_REQUEST, props<any>());

const UPDATE_USER_DETAILS_SUCCESS = '[profile] update profile details successful';
export const UpdateUserDetailsSuccess = createAction(UPDATE_USER_DETAILS_SUCCESS, props<any>());

const UPDATE_USER_DETAILS_FAILURE = '[profile] update profile details failure';
export const UpdateUserDetailsFailure = createAction(UPDATE_USER_DETAILS_FAILURE, props<any>());
