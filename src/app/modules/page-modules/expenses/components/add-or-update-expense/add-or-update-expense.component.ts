import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {CommonService} from "../../../../shared/services/common.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import {AddNewExpenseRequest, UpdateExpenseRequest} from "../../core/expense.actions";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-add-or-update-expense',
  templateUrl: './add-or-update-expense.component.html',
  styleUrls: ['./add-or-update-expense.component.css']
})
export class AddOrUpdateExpenseComponent implements OnInit {
  @Input() data: any;
  currencySymbolMap = {
    1: 'inr',
    2: 'usd',
    3: 'euro'
  }
  expenseData = {};
  selectedClient: number;
  errorMessages = {};
  errorMessageMap = {
    date: {
      required: 'Required',
    },
    expense: {
      required: 'Required'
    },
    amount: {
      required: 'Required'
    }
  }

  isEdit = false;
  form = new FormGroup({
    date: new FormControl({
      value: null,
      disabled: false
    }, [Validators.required]),
    expense: new FormControl({value: null, disabled: false}, [Validators.required]),
    amount: new FormControl({value: null, disabled: false}, [Validators.required]),
  });
  currency: number;
  exchangeRates: any;

  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
    private cdRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this.selectedClient = this.data?.selectedClient || -1;
    if (this.data?.expenseData) {
      this.isEdit = true;
      this.expenseData = this.data?.expenseData;

      this.form.patchValue({
        date: this.expenseData['date'],
        expense: this.expenseData['expense'],
        amount: this.expenseData['amount'],
      }, {emitEvent: false});
      this.cdRef.detectChanges();
    }
  }


  save() {
    if (this.form.invalid) {
      this.checkForErrors();
      return;
    }

    const {
      date,
      expense,
      amount,
    } = this.form.getRawValue();

    const payload: any = {
      ...(this.data?.expenseData ? {id: this.data.expenseData.id} : {id: this.generateUUID()}),
      date,
      expense,
      amount: Number(amount),
    }

    if (!this.data?.expenseData) {
      payload.id = this.generateUUID();
      this.store.dispatch(AddNewExpenseRequest({payload}));
    } else {
      this.store.dispatch(UpdateExpenseRequest({payload}));
    }
  }


  checkForErrors(currentField?: string) {
    this.errorMessages = {
      ...this.errorMessages,
      ...(this.commonService.checkFormValidation(this.form, this.errorMessageMap, currentField))
    };
  }

  generateUUID() {
    return uuidv4();
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
