import {Component} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import * as Validation from "../../../../shared/constants/validation.constants";
import {CommonService} from "../../../../shared/services/common.service";
import {FetchCurrencyFilterRequest, RegisterUserRequest} from "../../core/register-user.actions";
import {currencyFilter, loading} from "../../core/register-user.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrl: './register-user-form.component.css'
})
export class RegisterUserFormComponent {
  errorMessages: any = {};
  loading: boolean = false;
  validation = Validation;
  errorMessageMap = {
    email: {
      required: 'This field is required.',
      pattern: 'Invalid email address'
    },
    password: {
      required: 'This field is required.',
      minlength: `Password must contain at least ${this.validation.password.length.min} characters`,
      maxlength: `Password must contain only ${this.validation.password.length.max} characters`,
      lowerCaseCheckFailed: 'Password must contain at least 1 Lowercase character',
      upperCaseCheckFailed: 'Password must contain at least 1 Uppercase character',
      numberCheckFailed: 'Password must contain at least 1 numeric character',
      specialCharCheckFailed: 'Password must contain a Special character',
      containsSpaceCheckFailed: 'Password Cannot start with or contain space in between',
    },
    confirmPassword: {
      required: 'This field is required.',
      passwordMatchFailed: 'Confirm Password should be same as Password.'
    },
    userName: {
      required: 'This field is required.',
    },
    baseCurrency: {
      required: 'This field is required.',
    }
  }
  form = new FormGroup({
    email: new FormControl({
      value: '',
      disabled: false
    }, [Validators.required, Validators.pattern(this.validation.email.regex)]),
    userName: new FormControl({value: '', disabled: false}, [Validators.required]),
    baseCurrency: new FormControl({value: '', disabled: false}, [Validators.required]),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(this.validation.password.length.min),
        Validators.maxLength(this.validation.password.length.max),
        this.commonService.validatePassword
      ],
    }),
    confirmPassword: new FormControl({
      value: '',
      disabled: false
    }, [Validators.required]),
  }, {validators: [this.validateConfirmPassword]});
  currencyFilter = {list: [], loading: false}
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private commonService: CommonService,
    private router: Router
  ) {
    this.store.dispatch(FetchCurrencyFilterRequest({}))

    this.store.select(currencyFilter)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.currencyFilter = data
      })
  }

  register() {
    // Error checking in form
    if (this.form.invalid) {
      this.checkForErrors();
      return;
    }
    // Get the values from the login form
    const {email, password, confirmPassword, userName, baseCurrency} = this.form.getRawValue();

    let payload = {
      email,
      password,
      confirmPassword,
      username: userName,
      baseCurrency
    }
    // Dispatch action
    this.store.dispatch(RegisterUserRequest({payload}));


    this.store.select(loading)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.loading = data;
        if (this.loading) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
  }

  validateConfirmPassword(control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({passwordMatchFailed: true});
    } else if (confirmPasswordControl.hasError('passwordMatchFailed')) {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  }

  checkForErrors(currentField?: string) {
    this.errorMessages = {
      ...this.errorMessages,
      ...(this.commonService.checkFormValidation(this.form, this.errorMessageMap, currentField))
    };
  }

  redirectToLogin() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
