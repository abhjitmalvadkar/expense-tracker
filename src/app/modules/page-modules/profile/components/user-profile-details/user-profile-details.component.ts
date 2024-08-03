import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from "../../../../shared/services/common.service";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {email} from "../../../../shared/constants/validation.constants";
import {profile} from "../../core/profile.selectors";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.css']
})
export class UserProfileDetailsComponent implements OnInit, OnDestroy {

  userProfileDetails: any;
  brokenImageUrl='/assets/images/webp/broken-image.webp';
  protected readonly email = email;
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
  ) {

    this.store.select(profile)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        this.userProfileDetails = data?.userDetails
      });
  }

  ngOnInit() {

  }

  edit() {
    this.commonService.openDialog({
      data: {
        component: EditUserComponent,
        userProfileDetails: this.userProfileDetails
      },

    });
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
