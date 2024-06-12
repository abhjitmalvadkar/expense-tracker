import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ExpenseService} from './expense.service';
import {CommonService} from "../../../shared/services/common.service";
import {
  AddNewExpenseFailure,
  AddNewExpenseRequest,
  AddNewExpenseSuccess,
  DeleteExpenseFailure,
  DeleteExpenseRequest,
  DeleteExpenseSuccess,
  FetchExpenseListFailure,
  FetchExpenseListRequest,
  FetchExpenseListSuccess,
  UpdateExpenseFailure,
  UpdateExpenseRequest,
  UpdateExpenseSuccess
} from "./expense.actions";

@Injectable()
export class ExpenseEffects {

  fetchExpenseList$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(FetchExpenseListRequest),
      map((action: any) => {
        return action.payload;
      }),
      mergeMap((payload) =>
        this.expenseListService.fetchExpenseList(payload).pipe(
          map((response) => {
            const {data, message} = response;
            const {list} = data;
            let total = 0;
            list.forEach(item => total += item.amount);
            return FetchExpenseListSuccess({
              expenseInfo: {
                list: list,
                total
              },
              message
            });
          }),
          catchError((error) => {
            return of(FetchExpenseListFailure(error.message));
          }),
          tap((action: any) => {
            if (action.type === FetchExpenseListSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.commonService.notification(
                'All Expenses Fetched Successfully!', 'success'
              )
            } else if (action.type === FetchExpenseListFailure.type) {
              // Code to execute on API Failure Action dispatch

            }
          })
        )
      )
    )
  );

  addNewExpense$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AddNewExpenseRequest),
      map((action: any) => {
        return action.payload;
      }),
      mergeMap((payload) =>
        this.expenseListService.addNewExpense(payload).pipe(
          map((response) => {
            const {data, message} = response;
            const {list} = data;
            let total = 0;
            list.forEach(item => total += item.amount);
            return AddNewExpenseSuccess({
              expenseInfo: {
                list,
                total
              },
              message
            });
          }),
          catchError((error) => {
            return of(AddNewExpenseFailure(error.message));
          }),
          tap((action: any) => {
            if (action.type === AddNewExpenseSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.commonService.closeDialog();
              this.commonService.notification(
                'New Expense Added Successfully!', 'success'
              )
            } else if (action.type === AddNewExpenseFailure.type) {
              // Code to execute on API Failure Action dispatch

            }
          })
        )
      )
    )
  );

  updateExpense$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(UpdateExpenseRequest),
      map((action: any) => {
        return action.payload;
      }),
      mergeMap((payload) =>
        this.expenseListService.updateExpense(payload).pipe(
          map((response) => {
            const {data, message} = response;
            const {list} = data;
            let total = 0;
            list.forEach(item => total += item.amount);
            return UpdateExpenseSuccess({
              expenseInfo: {
                list,
                total
              },
              message
            });
          }),
          catchError((error) => {
            return of(UpdateExpenseFailure(error.message));
          }),
          tap((action: any) => {
            if (action.type === UpdateExpenseSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.commonService.closeDialog();
              this.commonService.notification(
                'Expense Updated Successfully!', 'success'
              )
            } else if (action.type === UpdateExpenseFailure.type) {
              // Code to execute on API Failure Action dispatch

            }
          })
        )
      )
    )
  );

  deleteExpense$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(DeleteExpenseRequest),
      map((action: any) => {
        return action.payload;
      }),
      mergeMap((payload) =>
        this.expenseListService.deleteExpense(payload).pipe(
          map((response) => {
            const {data, message} = response;
            const {list} = data;
            let total = 0;
            list.forEach(item => total += item.amount);
            return DeleteExpenseSuccess({
              expenseInfo: {
                list,
                total
              },
              message
            });
          }),
          catchError((error) => {
            return of(DeleteExpenseFailure(error.message));
          }),
          tap((action: any) => {
            if (action.type === DeleteExpenseSuccess.type) {
              // Code to execute on API Success Action dispatch
              this.commonService.closeDialog();
              this.commonService.notification(
                'Expense Deleted Successfully!', 'success'
              )
            } else if (action.type === DeleteExpenseFailure.type) {
              // Code to execute on API Failure Action dispatch
            }
          })
        )
      )
    )
  );

  constructor(
    private expenseListService: ExpenseService,
    private actions: Actions,
    private commonService: CommonService,
  ) {
  }
}
