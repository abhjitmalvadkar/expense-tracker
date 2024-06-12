import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {SharedService} from './shared.service';
import * as fromRoot from '../../../state/app.state';
import {CommonService} from "../services/common.service";
import {Observable, of} from "rxjs";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {FetchExchangeRatesFailure, FetchExchangeRatesRequest, FetchExchangeRatesSuccess} from "./shared.actions";

@Injectable()
export class SharedEffects {

  fetchExchangeRates$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(FetchExchangeRatesRequest),
      map((action: any) => {
        return action.payload;
      }),
      mergeMap((payload) =>
        this.sharedService.fetchExchangeRates().pipe(
          map((response) => {
            const {conversion_rates} = response;

            return FetchExchangeRatesSuccess({
              exchangeRates: conversion_rates
            });
          }),
          catchError((error) => {
            return of(FetchExchangeRatesFailure({}));
          }),
          tap((action: any) => {
            if (action.type === FetchExchangeRatesSuccess.type) {
              // Code to execute on API Success Action dispatch

            } else if (action.type === FetchExchangeRatesFailure.type) {
              // Code to execute on API Failure Action dispatch

            }
          })
        )
      )
    )
  );

  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
    private sharedService: SharedService,
    private actions: Actions,
  ) {
  }
}
