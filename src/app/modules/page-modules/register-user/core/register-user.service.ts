import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CommonService} from "../../../shared/services/common.service";
import {v1URL} from "../../../shared/constants/urls.constants";

@Injectable({
  providedIn: 'root',
})

export class RegisterUserService {
  userProfile = {
    imageUrl: 'https://reqres.in/img/faces/2-image.jpg',
    name: 'Eve Holt',
    emailId: 'eve.holt@reqres.in',
  }

  constructor(
    private commonServices: CommonService,
  ) {
  }

  registerUser(payload: any): Observable<any> {
    const {method, url} = v1URL.users.register;

    return this.commonServices.callAPI(
      method,
      url,
      payload
    );
  }

  fetchCurrencyFilter(): Observable<any> {
    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: [
        {
          key: 1,
          value: "Indian Rupee (INR)",
        },
        {
          key: 2,
          value: "United State Dollar (USD)",
        },
        {
          key: 3,
          value: "Euro (EUR)",
        }
      ]
    });
  }
}
