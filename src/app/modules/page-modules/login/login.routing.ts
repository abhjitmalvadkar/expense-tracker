import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginScreenComponent} from "./screen/login-screen.component";
import {
  InternalPageNotFoundComponent
} from "../../shared/pages/page-not-found/internal-page-not-found/internal-page-not-found.component";

const routes: Routes = [
  {
    path: '',
    component: LoginScreenComponent
  },
  {
    path: '**',
    component: InternalPageNotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
