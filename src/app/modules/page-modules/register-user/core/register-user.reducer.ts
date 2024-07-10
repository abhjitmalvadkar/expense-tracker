import {createReducer, on} from '@ngrx/store';
import {ClearState, RegisterUserFailure, RegisterUserRequest, RegisterUserSuccess,} from "./register-user.actions";

// State for this feature (User)
export interface RegisterUserState {
  loading: boolean;
}

const initialState: RegisterUserState = {
  loading: false
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
);
