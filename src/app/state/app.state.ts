import {SharedState} from "../modules/shared/core/shared.reducer";
import {ExpenseState} from "../modules/page-modules/expenses/core/expense.reducer";
import {ProfileState} from "../modules/page-modules/profile/core/profile.reducer";
import {RegisterUserState} from "../modules/page-modules/register-user/core/register-user.reducer";

export interface State {
  shared: SharedState,
  expense: ExpenseState,
  profile: ProfileState,
  registerUser: RegisterUserState,
}
