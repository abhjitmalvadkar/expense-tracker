import {Component} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../state/app.state";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-unauthenticated-wrapper',
  templateUrl: './unauthenticated-wrapper.component.html',
  styleUrls: ['./unauthenticated-wrapper.component.css']
})
export class UnauthenticatedWrapperComponent {

  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

}
