import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterUserRoutingModule} from './register-user-routing.module';
import {RegisterUserFormComponent} from './components/register-user-form/register-user-form.component';
import {RegisterUserScreenComponent} from "./screen/register-user-screen.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {reducer} from "../profile/core/profile.reducer";
import {EffectsModule} from "@ngrx/effects";
import {RegisterUserEffects} from "./core/register-user.effects";


@NgModule({
  declarations: [
    RegisterUserScreenComponent,
    RegisterUserFormComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('expense-tracker.register-user', reducer),
    EffectsModule.forFeature(
      [RegisterUserEffects]
    ),
  ]
})
export class RegisterUserModule {
}
