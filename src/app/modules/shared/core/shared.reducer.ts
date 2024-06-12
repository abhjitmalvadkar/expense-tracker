import {createReducer, on} from '@ngrx/store';
import {
  ClearLoading,
  ClearState,
  FetchExchangeRatesFailure,
  FetchExchangeRatesRequest,
  FetchExchangeRatesSuccess,
  SetScreenType,
  StartLoading,
  StopLoading,
} from "./shared.actions";

// State for this feature (User)
export interface SharedState {
  loading: number[],
  screenType: 'mobile' | 'tablet' | 'desktop' | '',
  profile: any,
  sidenavOpenCounter: number[];
  exchangeRates: any
}

const initialState: SharedState = {
  loading: [],
  screenType: '',
  profile: null,
  sidenavOpenCounter: [],
  exchangeRates: {}
};

export const reducer = createReducer(
  initialState,

  // CLEAR STATE
  on(ClearState, (state) => ({
    ...initialState,
    screenType: state.screenType
  })),

  // SET SCREEN TYPE
  on(SetScreenType, (state, props) => ({
    ...state,
    screenType: props.screenType
  })),

  // START LOADING
  on(StartLoading, (state) => ({
    ...state,
    loading: [...state.loading, 1],
  })),

  // STOP LOADING
  on(StopLoading, (state) => ({
    ...state,
    loading: [...state.loading].slice(1),
  })),

  // CLEAR LOADING
  on(ClearLoading, (state) => ({
    ...state,
    loading: [],
  })),

  // FETCH EXCHANGE RATES
  on(FetchExchangeRatesRequest, (state) => ({
    ...state
  })),
  on(FetchExchangeRatesSuccess, (state, props) => ({
    ...state,
    exchangeRates: props.exchangeRates
  })),
  on(FetchExchangeRatesFailure, (state) => ({
    ...state,
    exchangeRates: initialState.exchangeRates
  })),
)
