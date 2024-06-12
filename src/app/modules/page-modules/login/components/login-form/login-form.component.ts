import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import {CommonService} from "../../../../shared/services/common.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginRequest} from "../../core/login.actions";
import {Subject, takeUntil} from "rxjs";
import {loading} from "../../core/login.selectors";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  private readonly onDestroy: Subject<any> = new Subject<any>();

  errorMessages: any = {};
  loading: boolean = false;

  errorMessageMap = {
    username: {
      required: 'This field is required.'
    },
    password: {
      required: 'This field is required.'
    }
  }

  form = new FormGroup({
    username: new FormControl({
      value: '',
      disabled: false
    }, [Validators.required]),
    password: new FormControl({
      value: '',
      disabled: false
    }, [Validators.required]),
  })

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
    const {username, password} = this.form.getRawValue();

    let payload = {
      email: username,
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
