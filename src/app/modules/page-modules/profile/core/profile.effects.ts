import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProfileService} from './profile.service';
import * as fromRoot from '../../../../state/app.state';
import {CommonService} from "../../../shared/services/common.service";
import {
  FetchUserDetailsFailure,
  FetchUserDetailsRequest,
  FetchUserDetailsSuccess,
  UpdateUserDetailsFailure,
  UpdateUserDetailsRequest,
  UpdateUserDetailsSuccess
} from "./profile.actions";


@Injectable()
export class ProfileEffects {

  fetchUserDetails$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(FetchUserDetailsRequest),
      map((action: any) => {
        return action.payload;
      }),
      mergeMap((payload) =>
        this.userDetailsService.fetchUserDetails(payload).pipe(
          map((response) => {
            const {data, message} = response;
            return FetchUserDetailsSuccess({
              userDetails: data,
              message
            });
          }),
          catchError((error) => {
            return of(FetchUserDetailsFailure(error.message));
          }),
          tap((action: any) => {
            if (action.type === FetchUserDetailsSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.commonService.notification('Profile Fetched Successfully!', 'success');
            } else if (action.type === FetchUserDetailsFailure.type) {
              // Code to execute on API Failure Action dispatch

            }
          })
        )
      )
    )
  );

  updateUserDetails$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(UpdateUserDetailsRequest),
      map((action: any) => {
        return action.payload;
      }),
      mergeMap((payload) =>
        this.userDetailsService.updateUserDetails(payload).pipe(
          map((response) => {
            const {data, message} = response;
            return UpdateUserDetailsSuccess({
              userDetails: data,
              message
            });
          }),
          catchError((error) => {
            return of(UpdateUserDetailsFailure(error.message));
          }),
          tap((action: any) => {
            if (action.type === UpdateUserDetailsSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.commonService.closeDialog();
              this.commonService.notification('Profile Updated Successfully!', 'success');
            } else if (action.type === UpdateUserDetailsFailure.type) {
              // Code to execute on API Failure Action dispatch

            }
          })
        )
      )
    )
  );


  constructor(
    private store: Store<fromRoot.State>,
    private userDetailsService: ProfileService,
    private actions: Actions,
    private router: Router,
    private commonService: CommonService
  ) {
  }
}
