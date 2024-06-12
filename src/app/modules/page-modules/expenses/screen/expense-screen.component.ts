import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {CommonService} from "../../../shared/services/common.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../state/app.state";
import {exchangeRates, screenType} from "../../../shared/core/shared.selectors";
import {AddOrUpdateExpenseComponent} from "../components/add-or-update-expense/add-or-update-expense.component";
import {expenseInfo} from "../core/expense.selectors";
import {FetchExchangeRatesRequest} from "../../../shared/core/shared.actions";

@Component({
  selector: 'app-expense-screen',
  templateUrl: './expense-screen.component.html',
  styleUrls: ['./expense-screen.component.css']
})
export class ExpenseScreenComponent implements OnInit {
  screenType: string;
  total: any;
  selectedCurrency: number = 1;
  currencySymbolMap = {
    1: '₹',
    2: '$',
    3: '€'
  }
  inrTotal: any;
  usdTotal: any;
  eurTotal: any;
  exchangeRates: any;
  displayedTotal: string;
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
  ) {
    this.store.dispatch(FetchExchangeRatesRequest({}));

    this.store.select(screenType)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.screenType = data;
        }
      });

    this.store.select(exchangeRates)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.exchangeRates = data;
      });

    this.store.select(expenseInfo)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.displayedTotal = data.total.toFixed(2);
        this.inrTotal = data.total.toFixed(2);
        this.usdTotal = (this.exchangeRates['USD'] * data.total).toFixed(2);
        this.eurTotal = (this.exchangeRates['EUR'] * data.total).toFixed(2);
      });

    this.updateDisplay();
  }

  ngOnInit() {
  }

  add() {
    this.commonService.openDialog({
      data: {
        component: AddOrUpdateExpenseComponent
      },
      classList: ['add-edit-user-dialog']
    })
  }

  updateDisplay(): void {
    switch (this.selectedCurrency) {
      case 1:  // INR
        this.displayedTotal = this.inrTotal;
        break;
      case 2:  // USD
        this.displayedTotal = this.usdTotal;
        break;
      case 3:  // Euro
        this.displayedTotal = this.eurTotal;
        break;
      default:
        this.displayedTotal = this.inrTotal;  // Default to INR if nothing matches
    }
  }

  selectedCurrencyChange(currency: number): void {
    this.selectedCurrency = currency;
    this.updateDisplay();
  }


  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
