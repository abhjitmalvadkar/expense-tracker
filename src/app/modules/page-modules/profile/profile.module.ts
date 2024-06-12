import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {StoreModule} from "@ngrx/store";
import {ProfileScreenComponent} from "./screen/profile-screen.component";
import {UserProfileDetailsComponent} from "./components/user-profile-details/user-profile-details.component";
import {EffectsModule} from "@ngrx/effects";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ProfileEffects} from "./core/profile.effects";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {reducer} from "./core/profile.reducer";


@NgModule({
  declarations: [
    ProfileScreenComponent,
    UserProfileDetailsComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StoreModule.forFeature('expense-tracker.profile', reducer),
    EffectsModule.forFeature(
      [ProfileEffects]
    ),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule {
}

