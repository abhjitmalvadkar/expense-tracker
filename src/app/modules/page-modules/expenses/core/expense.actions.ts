/* NgRx */
import {createAction, props} from '@ngrx/store';

/******** CLEAR STATE ***********/
const CLEAR_STATE = '[expense] clear state';
export const ClearState = createAction(CLEAR_STATE);

/******** FETCH EXPENSE LIST ***********/
const FETCH_EXPENSE_LIST_REQUEST = '[expense] fetch expense list request';
export const FetchExpenseListRequest = createAction(FETCH_EXPENSE_LIST_REQUEST, props<any>());

const FETCH_EXPENSE_LIST_SUCCESS = '[expense] fetch expense list success';
export const FetchExpenseListSuccess = createAction(FETCH_EXPENSE_LIST_SUCCESS, props<any>());

const FETCH_EXPENSE_LIST_FAILURE = '[expense] fetch expense list failure';
export const FetchExpenseListFailure = createAction(FETCH_EXPENSE_LIST_FAILURE, props<any>());

/******** ADD NEW EXPENSE ***********/
const ADD_NEW_EXPENSE_REQUEST = '[expense] add new expense request';
export const AddNewExpenseRequest = createAction(ADD_NEW_EXPENSE_REQUEST, props<any>());

const ADD_NEW_EXPENSE_SUCCESS = '[expense] add new expense success';
export const AddNewExpenseSuccess = createAction(ADD_NEW_EXPENSE_SUCCESS, props<any>());

const ADD_NEW_EXPENSE_FAILURE = '[expense] add new expense failure';
export const AddNewExpenseFailure = createAction(ADD_NEW_EXPENSE_FAILURE, props<any>());

/******** UPDATE EXPENSE ***********/
const UPDATE_EXPENSE_REQUEST = '[expense] update expense request';
export const UpdateExpenseRequest = createAction(UPDATE_EXPENSE_REQUEST, props<any>());

const UPDATE_EXPENSE_SUCCESS = '[expense] update expense success';
export const UpdateExpenseSuccess = createAction(UPDATE_EXPENSE_SUCCESS, props<any>());

const UPDATE_EXPENSE_FAILURE = '[expense] update expense failure';
export const UpdateExpenseFailure = createAction(UPDATE_EXPENSE_FAILURE, props<any>());

/******** DELETE EXPENSE ***********/
const DELETE_EXPENSE_REQUEST = '[expense] delete expense request';
export const DeleteExpenseRequest = createAction(DELETE_EXPENSE_REQUEST, props<any>());

const DELETE_EXPENSE_SUCCESS = '[expense] delete expense success';
export const DeleteExpenseSuccess = createAction(DELETE_EXPENSE_SUCCESS, props<any>());

const DELETE_EXPENSE_FAILURE = '[expense] delete expense failure';
export const DeleteExpenseFailure = createAction(DELETE_EXPENSE_FAILURE, props<any>());

/******** FETCH USERS LIST ***********/
const FETCH_USERS_LIST_REQUEST = '[expense] fetch users list request';
export const FetchUsersListRequest = createAction(FETCH_USERS_LIST_REQUEST, props<any>());

const FETCH_USERS_LIST_SUCCESS = '[expense] fetch users list success';
export const FetchUsersListSuccess = createAction(FETCH_USERS_LIST_SUCCESS, props<any>());

const FETCH_USERS_LIST_FAILURE = '[expense] fetch users list failure';
export const FetchUsersListFailure = createAction(FETCH_USERS_LIST_FAILURE, props<any>());
