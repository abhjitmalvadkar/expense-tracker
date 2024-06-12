import {createReducer, on} from '@ngrx/store';
import {
  ClearState,
  FetchUserDetailsFailure,
  FetchUserDetailsRequest,
  FetchUserDetailsSuccess,
  UpdateUserDetailsFailure,
  UpdateUserDetailsRequest,
  UpdateUserDetailsSuccess
} from "./profile.actions";

// State for this feature (User)
export interface ProfileState {
  userDetailsInfo: {
    userDetails: any,
    loading: boolean
  }
}

const initialState: ProfileState = {
  userDetailsInfo: {
    userDetails: null,
    loading: false
  }
};

export const reducer = createReducer(
  initialState,

  // CLEAR STATE
  on(ClearState, (state) => initialState),

  // FETCH USER DETAILS
  on(FetchUserDetailsRequest, (state) => ({
    ...state,
    userDetailsInfo: {
      ...initialState.userDetailsInfo.userDetails,
      loading: true
    }
  })),

  on(FetchUserDetailsSuccess, (state, props) => ({
    ...state,
    userDetailsInfo: {
      userDetails: props.userDetails,
      loading: false
    }
  })),

  on(FetchUserDetailsFailure, (state) => ({
    ...state,
    userDetails: {
      ...initialState.userDetailsInfo.userDetails,
      loading: false
    }
  })),

  // UPDATE USER DETAILS
  on(UpdateUserDetailsRequest, (state) => ({
    ...state,
    userDetailsInfo: {
      ...initialState.userDetailsInfo.userDetails,
      loading: true
    }
  })),

  on(UpdateUserDetailsSuccess, (state, props) => ({
    ...state,
    userDetailsInfo: {
      userDetails: props.userDetails,
      loading: false
    }
  })),

  on(UpdateUserDetailsFailure, (state) => ({
    ...state,
    userDetails: {
      ...initialState.userDetailsInfo.userDetails,
      loading: false
    }
  })),
);
