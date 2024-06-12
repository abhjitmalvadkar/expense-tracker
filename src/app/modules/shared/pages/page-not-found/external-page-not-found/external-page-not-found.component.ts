import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-external-page-not-found',
  templateUrl: './external-page-not-found.component.html',
  styleUrls: ['./external-page-not-found.component.css']
})
export class ExternalPageNotFoundComponent {
  isAuthenticated = false;

  constructor(
    private commonService: CommonService
  ) {
    this.isAuthenticated = commonService.isAuthenticated();
  }
}
