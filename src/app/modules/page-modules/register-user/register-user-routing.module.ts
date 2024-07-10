import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  InternalPageNotFoundComponent
} from "../../shared/pages/page-not-found/internal-page-not-found/internal-page-not-found.component";
import {RegisterUserScreenComponent} from "./screen/register-user-screen.component";

const routes: Routes = [
  {
    path: '',
    component: RegisterUserScreenComponent
  },
  {
    path: '**',
    component: InternalPageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterUserRoutingModule {
}
