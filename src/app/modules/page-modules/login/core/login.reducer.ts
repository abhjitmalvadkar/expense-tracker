import {createReducer, on} from '@ngrx/store';
import {
  ClearState,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
} from "./login.actions";

// State for this feature (User)
export interface LoginState {
  loading: boolean;
}

const initialState: LoginState = {
  loading: false
};

export const reducer = createReducer(
  initialState,

  // CLEAR STATE
  on(ClearState, (state) => initialState),

  // LOGIN
  on(LoginRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(LoginSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(LoginFailure, (state) => ({
    ...state,
    loading: false
  })),
);
