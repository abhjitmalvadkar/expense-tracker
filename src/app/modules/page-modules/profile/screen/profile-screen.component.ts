import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../state/app.state";
import {CommonService} from "../../../shared/services/common.service";
import {screenType} from "../../../shared/core/shared.selectors";
import {MatSidenav} from "@angular/material/sidenav";
import {FetchUserDetailsRequest} from "../core/profile.actions";
import {profile} from "../core/profile.selectors";

@Component({
  selector: 'app-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css']
})
export class ProfileScreenComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;
  screenType: string;
  userDetails: any;
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private commonService: CommonService,
    private cdRef: ChangeDetectorRef,
  ) {

    this.store.dispatch(FetchUserDetailsRequest({}));

    this.store.select(profile)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        this.userDetails = data.userDetails
      });

  }

  ngOnInit() {
    this.store.select(screenType)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.screenType = data;

        if (this.drawer && this.screenType) {
          if (this.screenType === 'desktop') {
            this.drawer.open();
            this.cdRef.detectChanges();
          } else {
            this.drawer.close();
            this.cdRef.detectChanges();
          }
        }
      });

  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
