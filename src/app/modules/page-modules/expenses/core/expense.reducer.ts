import {createReducer, on} from '@ngrx/store';
import {
  AddNewExpenseFailure,
  AddNewExpenseRequest,
  AddNewExpenseSuccess,
  ClearState,
  DeleteExpenseFailure,
  DeleteExpenseRequest,
  DeleteExpenseSuccess,
  FetchExpenseListFailure,
  FetchExpenseListRequest,
  FetchExpenseListSuccess,
  FetchUsersListFailure,
  FetchUsersListRequest,
  FetchUsersListSuccess,
  UpdateExpenseFailure,
  UpdateExpenseRequest,
  UpdateExpenseSuccess
} from "./expense.actions";

// State for this feature (User)
export interface ExpenseState {
  loading: boolean,
  expenseInfo: {
    list: any[],
    total: number,
    loading: boolean
  };
  usersList: {
    list: any[],
    loading: boolean
  }
}

const initialState: ExpenseState = {
  loading: false,
  expenseInfo: {
    list: [],
    total: 0,
    loading: false
  },
  usersList: {
    list: [],
    loading: false
  }
};

export const reducer = createReducer(
  initialState,

  // CLEAR STATE
  on(ClearState, (state) => initialState),

  // FETCH EXPENSE LIST
  on(FetchExpenseListRequest, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: true
    }
  })),
  on(FetchExpenseListSuccess, (state, props) => ({
    ...state,
    expenseInfo: {
      ...props.expenseInfo,
      loading: false
    }
  })),
  on(FetchExpenseListFailure, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: false
    }
  })),

  // ADD NEW EXPENSE
  on(AddNewExpenseRequest, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: true
    }
  })),
  on(AddNewExpenseSuccess, (state, props) => ({
    ...state,
    expenseInfo: {
      ...props.expenseInfo,
      loading: false
    }
  })),
  on(AddNewExpenseFailure, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: false
    }
  })),

  // UPDATE EXPENSE
  on(UpdateExpenseRequest, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: true
    }
  })),
  on(UpdateExpenseSuccess, (state, props) => ({
    ...state,
    expenseInfo: {
      ...props.expenseInfo,
      loading: false
    }
  })),
  on(UpdateExpenseFailure, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: false
    }
  })),

  // DELETE EXPENSE
  on(DeleteExpenseRequest, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: true
    }
  })),
  on(DeleteExpenseSuccess, (state, props) => ({
    ...state,
    expenseInfo: {
      ...props.expenseInfo,
      loading: false
    }
  })),
  on(DeleteExpenseFailure, (state) => ({
    ...state,
    expenseInfo: {
      ...initialState.expenseInfo,
      loading: false
    }
  })),

  // FETCH USERS LIST
  on(FetchUsersListRequest, (state) => ({
    ...state,
    usersList: {
      ...initialState.usersList,
      loading: true
    }
  })),
  on(FetchUsersListSuccess, (state, props) => ({
    ...state,
    usersList: {
      list: props.usersList,
      loading: false
    }
  })),
  on(FetchUsersListFailure, (state) => ({
    ...state,
    usersList: {
      ...initialState.usersList,
      loading: false
    }
  })),
);
