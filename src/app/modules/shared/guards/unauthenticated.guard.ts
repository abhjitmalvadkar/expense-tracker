import {CanActivateFn, Router} from '@angular/router';
import {CommonService} from "../services/common.service";
import {inject} from "@angular/core";

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const commonService: CommonService = inject(CommonService);
  const router: Router = inject(Router);

  if (!commonService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/expenses']);
  }

  return false;
};
