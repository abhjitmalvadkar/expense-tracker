import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  UnauthenticatedWrapperComponent
} from "./modules/shared/components/wrappers/unauthenticated-wrapper/unauthenticated-wrapper.component";
import {unauthenticatedGuard} from "./modules/shared/guards/unauthenticated.guard";
import {
  ExternalPageNotFoundComponent
} from "./modules/shared/pages/page-not-found/external-page-not-found/external-page-not-found.component";
import {authenticatedGuard} from "./modules/shared/guards/authenticated.guard";
import {
  AuthenticatedWrapperComponent
} from "./modules/shared/components/wrappers/authenticated-wrapper/authenticated-wrapper.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [unauthenticatedGuard],
    component: UnauthenticatedWrapperComponent,
    loadChildren: () =>
      import('./modules/page-modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'expenses',
    canActivate: [authenticatedGuard],
    component: AuthenticatedWrapperComponent,
    loadChildren: () =>
      import('./modules/page-modules/expenses/expenses.module').then((m) => m.ExpensesModule),
  },
  {
    path: 'profile',
    canActivate: [authenticatedGuard],
    component: AuthenticatedWrapperComponent,
    loadChildren: () =>
      import('./modules/page-modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    component: ExternalPageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
