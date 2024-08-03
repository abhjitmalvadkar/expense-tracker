import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginFailure, LoginRequest, LoginSuccess} from './login.actions';
import {LoginService} from './login.service';
import * as fromRoot from '../../../../state/app.state';
import {CommonService} from "../../../shared/services/common.service";
import {ActionModel} from "../../../../models/action.model";
import {SetProfile} from "../../../shared/core/shared.actions";

@Injectable()
export class LoginEffects {
  login$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(LoginRequest),
      map((action: ActionModel) => {
        return action.payload;
      }),
      mergeMap((payload: any) =>
        this.loginService.login(payload).pipe(
          map((response: any) => {
            const {data, message} = response;
            const {profile, token} = data
            const accessToken: string = token;
            this.commonService.setAuthenticationToken(accessToken);
            this.store.dispatch(SetProfile({profile}));
            return LoginSuccess({
              message
            });
          }),
          catchError(() => {
            return of(LoginFailure({}));
          }),
          tap((action: any) => {
            if (action.type === LoginSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.router.navigate(['/expenses']);
              this.commonService.notification(
                action.message,
                'success'
              );
            } else if (action.type === LoginFailure.type) {
              // Code to execute on API Failure Action dispatch
            }
          })
        )
      )
    )
  );

  constructor(
    private store: Store<fromRoot.State>,
    private loginService: LoginService,
    private actions: Actions,
    private router: Router,
    private commonService: CommonService
  ) {
  }
}
