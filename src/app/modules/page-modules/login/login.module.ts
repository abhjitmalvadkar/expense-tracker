import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from "./login.routing";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./core/login.reducer";
import {EffectsModule} from "@ngrx/effects";
import {LoginEffects} from "./core/login.effects";
import { LoginScreenComponent } from './screen/login-screen.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginFormComponent } from './components/login-form/login-form.component';



@NgModule({
  declarations: [
    LoginScreenComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    StoreModule.forFeature('expense-tracker.login', reducer),
    EffectsModule.forFeature(
      [LoginEffects]
    ),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
