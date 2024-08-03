import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {v1URL} from '../../../shared/constants/urls.constants';
import {CommonService} from "../../../shared/services/common.service";

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  constructor(
    private commonServices: CommonService,
  ) {
  }

  login(payload: any): Observable<any> {
    const {method, url} = v1URL.users.login;

    return this.commonServices.callAPI(
      method,
      url,
      payload
    );
  }
}
