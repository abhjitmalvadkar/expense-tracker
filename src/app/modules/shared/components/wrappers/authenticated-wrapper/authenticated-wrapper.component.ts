import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import {Subject, takeUntil} from "rxjs";
import {screenType} from "../../../core/shared.selectors";
import {CommonService} from "../../../services/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authenticated-wrapper',
  templateUrl: './authenticated-wrapper.component.html',
  styleUrls: ['./authenticated-wrapper.component.css']
})
export class AuthenticatedWrapperComponent {
  screenType: string;
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private commonService: CommonService,
    private router: Router,
  ) {
    this.store.select(screenType)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data) {
          this.screenType = data;
        }
      });


  }


  navigateToExpenseView() {
    this.router.navigateByUrl('/expenses');
  }

  navigateToProfileView() {
    this.router.navigateByUrl('/profile');
  }

  logout() {
    this.commonService.logout();
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
