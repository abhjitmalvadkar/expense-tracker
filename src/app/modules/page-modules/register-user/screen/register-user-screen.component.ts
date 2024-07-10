import {Component} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../state/app.state";
import {CommonService} from "../../../shared/services/common.service";
import {screenType} from "../../../shared/core/shared.selectors";

@Component({
  selector: 'app-register-user-screen',
  templateUrl: './register-user-screen.component.html',
  styleUrl: './register-user-screen.component.css'
})
export class RegisterUserScreenComponent {
  screenType = 'desktop';
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private commonService: CommonService,
  ) {

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
