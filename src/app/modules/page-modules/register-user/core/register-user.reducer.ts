import {createReducer, on} from '@ngrx/store';
import {
  ClearState,
  FetchCurrencyFilterFailure,
  FetchCurrencyFilterRequest,
  FetchCurrencyFilterSuccess,
  RegisterUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess,
} from "./register-user.actions";

// State for this feature (User)
export interface RegisterUserState {
  loading: boolean;
  currencyFilter: {
    list: any[];
    loading: boolean;
  }
}

const initialState: RegisterUserState = {
  loading: false,
  currencyFilter: {
    list: [],
    loading: false
  }
};

export const reducer = createReducer(
  initialState,

  // CLEAR STATE
  on(ClearState, (state) => initialState),

  // REGISTER USER
  on(RegisterUserRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(RegisterUserSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(RegisterUserFailure, (state) => ({
    ...state,
    loading: false
  })),

  // FETCH CURRENCY FILTER
  on(FetchCurrencyFilterRequest, (state) => ({
    ...state,
    currencyFilter: {
      ...initialState.currencyFilter,
      loading: true
    }
  })),
  on(FetchCurrencyFilterSuccess, (state, props) => {
    return ({
      ...state,
      currencyFilter: {
        list: props.currencyFilterList,
        loading: false
      }
    })
  }),
  on(FetchCurrencyFilterFailure, (state) => ({
    ...state,
    currencyFilter: {
      ...initialState.currencyFilter,
      loading: false
    }
  })),
);
