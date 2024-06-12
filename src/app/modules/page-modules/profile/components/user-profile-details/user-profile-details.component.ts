import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../shared/services/common.service";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {email} from "../../../../shared/constants/validation.constants";

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.css']
})
export class UserProfileDetailsComponent implements OnInit {

  @Input() userProfileDetails: any;
  protected readonly email = email;

  constructor(
    private commonService: CommonService
  ) {
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
}
