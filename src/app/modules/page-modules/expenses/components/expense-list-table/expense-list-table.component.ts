import {Component} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";
import {CommonService} from "../../../../shared/services/common.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import {AddOrUpdateExpenseComponent} from "../add-or-update-expense/add-or-update-expense.component";
import {Router} from "@angular/router";
import {DeleteExpenseRequest, FetchExpenseListRequest} from "../../core/expense.actions";
import {expenseInfo} from "../../core/expense.selectors";

@Component({
  selector: 'app-expense-list-table',
  templateUrl: './expense-list-table.component.html',
  styleUrls: ['./expense-list-table.component.css']
})
export class ExpenseListTableComponent {
  currencySymbolMap = {
    1: '₹',
    2: '$',
    3: '€'
  }

  currencyMap = {
    inr: 1,
    usd: 2,
    euro: 3
  }

  displayedColumns = [
    'date',
    'expense',
    'amount',
    'action'
  ];
  dataSource: any[] = [];
  loading: boolean = false;
  form: FormGroup = new FormGroup({});
  selectedCurrency: number;
  exchangeRates: {};
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    protected commonService: CommonService
  ) {

    this.store.dispatch(FetchExpenseListRequest({}));
  }

  ngOnInit() {
    this.store.select(expenseInfo)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.dataSource = data?.list;
        this.loading = data.loading;
      });
  }

  edit(data) {
    this.commonService.openDialog({
      data: {
        component: AddOrUpdateExpenseComponent,
        expenseData: data,
      },
      classList: ['add-edit-expense-dialog']
    })
  }

  delete(data) {
    this.commonService.openConfirmationDialog({
        data: {
          message: 'Are you sure you want to continue with delete?',
          submitText: 'Yes',
          classList: 'w-[40vw]',
          handleSubmit: () => {
            this.store.dispatch(DeleteExpenseRequest({payload: {expenseId: data.id}}));
          },
          cancelText: 'No',
          handleCancel: () => {
            this.commonService.closeDialog();
          }
        }
      }
    );
  }


  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}

