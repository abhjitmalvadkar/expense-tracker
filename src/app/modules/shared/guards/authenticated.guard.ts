import {CanActivateFn, Router} from '@angular/router';
import {CommonService} from "../services/common.service";
import {inject} from "@angular/core";


export const authenticatedGuard: CanActivateFn = (route, state) => {
  const commonService: CommonService = inject(CommonService);
  const router: Router = inject(Router);

  const authenticationToken = commonService.getAuthenticationToken();

  return !!authenticationToken;
};
