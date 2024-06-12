import { Component } from '@angular/core';
import {delay, Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import {MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../services/common.service";
import * as fromRoot from '../../../../state/app.state';
import {isLoading} from "../../core/shared.selectors";

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent {
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private dialogRef: MatDialogRef<LoadingScreenComponent>,
    private commonService: CommonService,
    private store: Store<fromRoot.State>
  ) {
    this.store.pipe(select(isLoading))
      .pipe(delay(0))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        if (!data.length) {
          this.dialogRef.close();
          this.commonService.isLoadingScreenOpen.next(false);
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
