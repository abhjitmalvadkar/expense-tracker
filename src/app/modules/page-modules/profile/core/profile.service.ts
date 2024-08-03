import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CommonService} from "../../../shared/services/common.service";
import {v1URL} from "../../../shared/constants/urls.constants";

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  userProfile = {
    imageUrl: 'https://reqres.in/img/faces/2-image.jpg',
    name: 'Eve Holt',
    emailId: 'eve.holt@reqres.in',
  }

  constructor(
    private commonServices: CommonService,
  ) {
  }

  fetchUserDetails(): Observable<any> {
    const {method, url} = v1URL.users.fetchProfile;

    return this.commonServices.callAPI(
      method,
      url
    );
  }

  updateUserDetails(payload: any): Observable<any> {
    this.userProfile = {...payload}
    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: {
        ...this.userProfile
      }
    });
  }
}
