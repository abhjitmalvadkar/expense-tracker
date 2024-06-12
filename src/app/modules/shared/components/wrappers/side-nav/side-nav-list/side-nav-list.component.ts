import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from "../../../../services/common.service";
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import * as fromRoot from '../../../../../../state/app.state';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit, OnDestroy {

  options: any = [];

  constructor(
    private store: Store<fromRoot.State>,
    private commonService: CommonService) {
  }

  ngOnInit(): void {

    this.options = [
      {
        link: 'expenses',
        label: 'Expenses',
        id : 'expenses'
      },
      {
        link: 'profile',
        label: 'Profile',
        id: 'profile',
      }
    ];
  }

  ngOnDestroy() {

  }
}
