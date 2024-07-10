import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import {CommonService} from "../../../../shared/services/common.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../core/login.actions";
import {Subject, takeUntil} from "rxjs";
import {loading} from "../../core/login.selectors";
import * as Validation from '../../../../shared/constants/validation.constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  errorMessages: any = {};
  loading: boolean = false;
  errorMessageMap = {
    email: {
      required: 'This field is required.',
      pattern: 'Invalid email address'
    },
    password: {
      required: 'This field is required.'
    }
  }
  validation = Validation;
  form = new FormGroup({
    email: new FormControl({
      value: '',
      disabled: false
    }, [Validators.required, Validators.pattern(this.validation.email.regex)]),
    password: new FormControl({
      value: '',
      disabled: false
    }, [Validators.required]),
  })
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private commonService: CommonService,
    private http: HttpClient
  ) {
  }

  login() {
    // Error checking in form
    if (this.form.invalid) {
      this.checkForErrors();
      return;
    }
    // Get the values from the login form
    const {email, password} = this.form.getRawValue();

    let payload = {
      email,
      password,
    }
    // Dispatch action
    this.store.dispatch(LoginRequest({payload}));


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

  checkForErrors(currentField?: string) {
    this.errorMessages = {
      ...this.errorMessages,
      ...(this.commonService.checkFormValidation(this.form, this.errorMessageMap, currentField))
    };
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
