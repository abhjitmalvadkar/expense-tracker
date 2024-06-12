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
  displayTranslationSelector: boolean = false;
  regex = new RegExp(/\/survey\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);

  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const url = this.router.url.split('?')[0];
    this.displayTranslationSelector = this.regex.test(url);
  }

}
