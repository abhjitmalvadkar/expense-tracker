import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-internal-page-not-found',
  templateUrl: './internal-page-not-found.component.html',
  styleUrls: ['./internal-page-not-found.component.css']
})
export class InternalPageNotFoundComponent {
  constructor(
    private router: Router,
    private commonService: CommonService
  ) {
  }

  redirectHome() {
    this.router.navigate(['/'])
  }
}
