import {SharedState} from "../modules/shared/core/shared.reducer";
import {ExpenseState} from "../modules/page-modules/expenses/core/expense.reducer";
import {ProfileState} from "../modules/page-modules/profile/core/profile.reducer";

export interface State {
  shared: SharedState,
  expense: ExpenseState,
  profile: ProfileState,
}
