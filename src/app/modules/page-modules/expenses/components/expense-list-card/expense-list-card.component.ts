import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import {Router} from "@angular/router";
import {CommonService} from "../../../../shared/services/common.service";
import {FetchExpenseListRequest} from "../../core/expense.actions";
import {expenseInfo} from "../../core/expense.selectors";
import {AddOrUpdateExpenseComponent} from "../add-or-update-expense/add-or-update-expense.component";

@Component({
  selector: 'app-expense-list-card',
  templateUrl: './expense-list-card.component.html',
  styleUrls: ['./expense-list-card.component.css']
})
export class ExpenseListCardComponent {
  displayedColumns = [
    'date',
    'expense',
    'amount',
    'action'
  ];
  dataSource: any[] = [];
  loading: boolean = false;
  form: FormGroup = new FormGroup({});
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private commonService: CommonService
  ) {
    // this.store.dispatch(FetchUserListRequest({}));
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
        userData: data,
      },
      classList: ['add-edit-expense-dialog']
    })
  }

  delete(data) {
    this.router.navigate([`/`])
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}

