import {Inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../state/app.state";
import {BehaviorSubject, catchError, map, Subject, throwError} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DOCUMENT} from "@angular/common";
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {DialogBoxComponent} from "../components/dialogbox/basic-dialog/dialog-box.component";
import {ConfirmationDialogComponent} from "../components/dialogbox/confirmation-dialog/confirmation-dialog.component";
import * as SharedActions from '../core/shared.actions';
import {ClearState as ClearSharedState} from '../core/shared.actions';
import {ClearState as ClearLoginState} from '../../page-modules/login/core/login.actions';
import {ClearState as ClearProfileState} from '../../page-modules/profile/core/profile.actions';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  closeMobileDialog: Subject<void> = new Subject();
  onNavigationEnd: BehaviorSubject<any> = new BehaviorSubject({});
  isLoadingScreenOpen: Subject<boolean> = new Subject();
  setSidenavButtonVisibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  alphanumericRegex = `^[^-\\s]([0-9a-zA-Z])+$`;
  currencyNameMap = {
    1: 'INR',
    2: 'USD',
    3: 'EUR'
  }

  // Used for copyToClipboard(value)
  private dom: Document;

  constructor(
    @Inject(DOCUMENT) dom?: Document,
    private store?: Store<fromRoot.State>,
    private router?: Router,
    private http?: HttpClient,
    private dialog?: MatDialog,
    private snackBar?: MatSnackBar,
  ) {
    this.dom = dom;
  }

  setToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setToSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getFromSessionStorage(key: string) {
    return sessionStorage.getItem(key);
  }

  removeFromSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  setAuthenticationToken(token: string) {
    this.setToLocalStorage('expense-tracker/access-token', token);
  }

  getAuthenticationToken() {
    return this.getFromLocalStorage('expense-tracker/access-token');
  }

  removeAuthenticationToken() {
    return this.removeFromLocalStorage('expense-tracker/access-token');
  }

  isAuthenticated() {
    return !!this.getAuthenticationToken();
  }

  callAPI(type: string, url: string, payload?: any, options: any = {}) {
    // @ts-ignore
    let apiCall = this.http[type]<any>(url, payload, {
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      ...options,
    });

    if (type === 'delete') {
      apiCall = this.http[type]<any>(url, {
        observe: 'response',
        body: payload || {},
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        ...options,
      });
    }

    return apiCall.pipe(
      map((response: any) => {
        if (response instanceof HttpResponse) {
          return response.body;
        }

        return response;
      }),
      catchError((error) => throwError(error))
    );
  }

  startLoading() {
    this.store.dispatch(SharedActions.StartLoading());
  }

  stopLoading() {
    this.store.dispatch(SharedActions.StopLoading());
  }

  openDesktopDialog(config: any = {}) {
    config = {
      ...config
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = [
      'dialog',
      ...(config.classList ? config.classList : []),
      ...(config.panelWidth ? [`panel-width-${config.panelWidth}`] : [])
    ];
    this.dialog.open(DialogBoxComponent, {
      ...dialogConfig,
      ...config,
      autoFocus: false
    });
  }

  closeDesktopDialog() {
    this.dialog.closeAll();
  }

  checkFormValidation(form: FormGroup, errorMessageMap: any,
                      currentField?: string) {
    const errorMessages = {};
    const formControls = form.controls || null;

    if (currentField) {
      const errors = form.controls[currentField].errors;
      const firstErrorType = errors ? Object.keys(errors)[0] : '';
      // @ts-ignore
      errorMessages[currentField] = errorMessageMap[currentField][firstErrorType];
      return errorMessages;
    }

    for (const eachControlName in formControls) {
      const isControlValid = form.controls[eachControlName].valid;
      if (!isControlValid) {
        const errors = form.controls[eachControlName].errors;
        const firstErrorType = errors ? Object.keys(errors)[0] : null;
        if (firstErrorType) {
          form.controls[eachControlName].markAsTouched();
          // @ts-ignore
          errorMessages[eachControlName] = errorMessageMap[eachControlName][firstErrorType];
        }
      }
    }
    return errorMessages;
  }

  notification(
    message: string,
    type = '',
    actionText?: string,
    duration = 1500,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ) {
    this.snackBar.open(message, actionText, {
      duration,
      verticalPosition,
      horizontalPosition,
      panelClass: [type],
    });
  }

  clearAppState() {
    this.store.dispatch(ClearSharedState());
    this.store.dispatch(ClearLoginState());
    this.store.dispatch(ClearProfileState());

    this.closeDialog();
  }

  clearStorage() {
    this.removeAuthenticationToken();

    const appLocalStorageKeys = [
      'expense-tracker.shared',
      'expense-tracker.login',
      'expense-tracker.profile'
    ];

    appLocalStorageKeys.forEach((key) => {
      this.removeFromSessionStorage(key);
    });
  }

  logout() {
    this.clearStorage();
    this.clearAppState();
    console.log('logout');
    this.router.navigate(['/login']);
  }

  openDialog(params: any) {
    this.openDesktopDialog(params);
  }

  closeDialog() {
    // Close mobile dialog.
    this.closeMobileDialog.next();

    // Close desktop dialog
    this.closeDesktopDialog();
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    let errors = {};

    const containsLowercase = new RegExp('[a-z]');
    if (!containsLowercase.test(password)) {
      errors = {
        ...errors,
        lowerCaseCheckFailed: true
      }
      return errors;
    }

    const containsUppercase = new RegExp('[A-Z]');
    if (!containsUppercase.test(password)) {
      errors = {
        ...errors,
        upperCaseCheckFailed: true
      }
      return errors;
    }

    const containsNumber = new RegExp('[0-9]');
    if (!containsNumber.test(password)) {
      errors = {
        ...errors,
        numberCheckFailed: true
      }
      return errors;
    }

    const containsSpecialChar = new RegExp('[!@#$%^&*()\\\\/\\[\\]\-_=+{}|?>.<,:;~`\'÷×₹€¥"]');
    if (!containsSpecialChar.test(password)) {
      errors = {
        ...errors,
        specialCharCheckFailed: true
      }
      return errors;
    }

    return null;
  }

  headerRemOffsetCalculator() {
    const currentScreenWidth = window.innerWidth;
    let remBase = 20;

    if (currentScreenWidth < 1439) {
      remBase = 8;
    } else if (currentScreenWidth < 1919) {
      remBase = 10;
    } else if (currentScreenWidth < 2559) {
      remBase = 12;
    } else if (currentScreenWidth < 3439) {
      remBase = 16;
    }

    return 14 * remBase;
  }

  openConfirmationDialog(config = {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'confirmation-dialog';
    this.dialog.open(ConfirmationDialogComponent, {
      ...dialogConfig,
      disableClose: true, ...config
    });
  }

}
