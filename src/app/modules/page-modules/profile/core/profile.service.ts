import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CommonService} from "../../../shared/services/common.service";
import {HttpClient} from "@angular/common/http";

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
    private http?: HttpClient,
  ) {
  }

  fetchUserDetails(payload: any): Observable<any> {
    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: {
        ...this.userProfile
      }
    });
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
