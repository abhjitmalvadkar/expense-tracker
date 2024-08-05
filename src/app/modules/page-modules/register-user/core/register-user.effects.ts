import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RegisterUserService} from './register-user.service';
import * as fromRoot from '../../../../state/app.state';
import {CommonService} from "../../../shared/services/common.service";
import {ActionModel} from "../../../../models/action.model";
import {
  FetchCurrencyFilterFailure,
  FetchCurrencyFilterRequest,
  FetchCurrencyFilterSuccess,
  RegisterUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess
} from "./register-user.actions";
import {SetProfile} from "../../../shared/core/shared.actions";


@Injectable()
export class RegisterUserEffects {

  registerUser$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(RegisterUserRequest),
      map((action: ActionModel) => {
        return action.payload;
      }),
      mergeMap((payload: any) =>
        this.registerUserService.registerUser(payload).pipe(
          map((response: any) => {
            const {data, message} = response;
            const {profile, token} = data
            const accessToken: string = token;
            this.commonService.setAuthenticationToken(accessToken);
            this.store.dispatch(SetProfile({profile}));
            return RegisterUserSuccess({
              message
            });
          }),
          catchError(() => {
            return of(RegisterUserFailure({}));
          }),
          tap((action: any) => {
            if (action.type === RegisterUserSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.router.navigate(['/expenses']);
              this.commonService.notification(
                action.message,
                'success'
              );
            } else if (action.type === RegisterUserFailure.type) {
              // Code to execute on API Failure Action dispatch
            }
          })
        )
      )
    )
  );


  fetchCurrencyFilter$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(FetchCurrencyFilterRequest),
      map((action: ActionModel) => {
        return action.payload;
      }),
      mergeMap(() =>
        this.registerUserService.fetchCurrencyFilter().pipe(
          map((response: any) => {
            const {data, message} = response;
            return FetchCurrencyFilterSuccess({
              currencyFilterList: data,
              message
            });
          }),
          catchError(() => {
            return of(FetchCurrencyFilterFailure({}));
          }),
          tap((action: any) => {
            if (action.type === FetchCurrencyFilterSuccess.type) {
              // Code to execute on API Success Action dispatch

            } else if (action.type === FetchCurrencyFilterFailure.type) {
              // Code to execute on API Failure Action dispatch
            }
          })
        )
      )
    )
  );


  constructor(
    private store: Store<fromRoot.State>,
    private registerUserService: RegisterUserService,
    private actions: Actions,
    private router: Router,
    private commonService: CommonService
  ) {
  }
}
