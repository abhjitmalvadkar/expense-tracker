import {Injectable} from '@angular/core';
import {CommonService} from "../services/common.service";
import {Observable} from "rxjs";
import {v1URL} from "../constants/urls.constants";

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  constructor(
    private commonServices: CommonService
  ) {
  }

  fetchExchangeRates(): Observable<any> {

    const {method, url} = v1URL.exchangeRates;
    return this.commonServices.callAPI(
      method,
      url
    );
  }

}
