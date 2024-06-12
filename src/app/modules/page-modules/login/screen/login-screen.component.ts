import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../state/app.state";
import {screenType} from "../../../shared/core/shared.selectors";
import {Subject, takeUntil} from "rxjs";
import {CommonService} from "../../../shared/services/common.service";
import {ClearState} from "../core/login.actions";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {
  private readonly onDestroy: Subject<any> = new Subject<any>();

  screenType = 'desktop';

  constructor(
    private store: Store<fromRoot.State>,
    private commonService: CommonService,
  ) {
    this.store.dispatch(ClearState());

    this.store.select(screenType)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.screenType = data;
      });

  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
