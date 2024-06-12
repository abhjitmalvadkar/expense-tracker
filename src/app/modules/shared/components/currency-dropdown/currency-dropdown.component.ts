import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../../state/app.state';
import {Subject, takeUntil} from "rxjs";
import {screenType} from "../../core/shared.selectors";

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrl: './currency-dropdown.component.css'
})
export class CurrencyDropdownComponent implements OnInit {
  @Output() selectedCurrencyChange = new EventEmitter();

  currencies = [
    {
      key: 1,
      value1: "Indian Rupee (INR)",
      value2: "INR",
    },
    {
      key: 2,
      value1: "United State Dollar (USD)",
      value2: "USD",
    },
    {
      key: 3,
      value1: "Euro (EUR)",
      value2: "EUR",
    }
  ];

  selectedCurrency = 1;
  icon = 'caret-down';
  screenType: string;

  private readonly onDestroy: Subject<any> = new Subject<any>();


  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
  ) {
    this.store.select(screenType)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.screenType = data;
        }
      });
  }

  ngOnInit(): void {
  }

  selectCurrency(event) {
    const changedCurrency = (event.value)
    this.selectedCurrencyChange.emit(changedCurrency);
  }
}

