import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  InternalPageNotFoundComponent
} from "../../shared/pages/page-not-found/internal-page-not-found/internal-page-not-found.component";
import {ExpenseScreenComponent} from "./screen/expense-screen.component";

const routes: Routes = [
  {
    path: '',
    component: ExpenseScreenComponent
  },
  {
    path: 'not-found',
    component: InternalPageNotFoundComponent
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
export class ExpensesRoutingModule {
}
