import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PrimaryButtonComponent} from "./components/buttons/primary-button/primary-button.component";
import {DialogBoxComponent} from "./components/dialogbox/basic-dialog/dialog-box.component";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {MaterialModule} from "./material-module";
import {ConfirmationDialogComponent} from "./components/dialogbox/confirmation-dialog/confirmation-dialog.component";
import {NumberInputComponent} from "./components/form-fields/input/number-input/number-input.component";
import {PasswordInputComponent} from "./components/form-fields/input/password-input/password-input.component";
import {
  PhoneNumberInputComponent
} from "./components/form-fields/input/phone-number-input/phone-number-input.component";
import {RadioInputComponent} from "./components/form-fields/input/radio-input/radio-input.component";
import {TextAreaInputComponent} from "./components/form-fields/input/text-area-input/text-area-input.component";
import {SearchOnSelectComponent} from "./components/form-fields/search-on-select/search-on-select.component";
import {IconComponent} from "./components/icon/icon.component";
import {DateDirective} from "./directive/date.directive";
import {DatetimeDirective} from "./directive/datetime.directive";
import {InputRestrictionDirective} from "./directive/input-restriction.directive";
import {OnlyDigitsDirective} from "./directive/only-digits.directive";
import {PreventMultipleClickDirective} from "./directive/prevent-multiple-click.directive";
import {PhoneNumberDirective} from "./directive/phone-number.directive";
import {DateFormatPipe} from "./pipes/date-format.pipe";
import {DatetimeFormatPipe} from "./pipes/datetime-format.pipe";
import {PhoneNumberFormatPipe} from "./pipes/phone-number-format.pipe";
import {SafeHTMLPipe} from "./pipes/safe-html.pipe";
import {SafeUrlPipe} from "./pipes/safe-url.pipe";
import {SharedEffects} from "./core/shared.effects";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./core/shared.reducer";
import {EffectsModule} from "@ngrx/effects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  UnauthenticatedWrapperComponent
} from './components/wrappers/unauthenticated-wrapper/unauthenticated-wrapper.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {
  AuthenticatedWrapperComponent
} from './components/wrappers/authenticated-wrapper/authenticated-wrapper.component';
import {TextInputComponent} from "./components/form-fields/input/text-input/text-input.component";
import {DropdownComponent} from "./components/form-fields/dropdown/dropdown.component";
import {
  ExternalPageNotFoundComponent
} from "./pages/page-not-found/external-page-not-found/external-page-not-found.component";
import {
  InternalPageNotFoundComponent
} from './pages/page-not-found/internal-page-not-found/internal-page-not-found.component';
import {LoadingScreenComponent} from './components/loading-screen/loading-screen.component';
import {SecondaryButtonComponent} from './components/buttons/secondary-button/secondary-button.component';
import {CheckboxComponent} from "./components/form-fields/input/checkbox/checkbox.component";
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {SideNavListComponent} from './components/wrappers/side-nav/side-nav-list/side-nav-list.component';
import {SideNavItemComponent} from './components/wrappers/side-nav/side-nav-item/side-nav-item.component';
import {DatePickerComponent} from "./components/form-fields/date-picker/date-picker.component";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {CurrencyDropdownComponent} from "./components/currency-dropdown/currency-dropdown.component";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";

@NgModule({
    declarations: [
        PrimaryButtonComponent,
        DialogBoxComponent,
        ConfirmationDialogComponent,
        NumberInputComponent,
        PasswordInputComponent,
        PhoneNumberInputComponent,
        RadioInputComponent,
        TextAreaInputComponent,
        SearchOnSelectComponent,
        IconComponent,
        DateDirective,
        DatetimeDirective,
        InputRestrictionDirective,
        OnlyDigitsDirective,
        PreventMultipleClickDirective,
        PhoneNumberDirective,
        DateFormatPipe,
        DatetimeFormatPipe,
        PhoneNumberFormatPipe,
        SafeHTMLPipe,
        SafeUrlPipe,
        UnauthenticatedWrapperComponent,
        AuthenticatedWrapperComponent,
        TextInputComponent,
        DropdownComponent,
        ExternalPageNotFoundComponent,
        InternalPageNotFoundComponent,
        LoadingScreenComponent,
        SecondaryButtonComponent,
        CheckboxComponent,
        SideNavComponent,
        SideNavListComponent,
        SideNavItemComponent,
        DatePickerComponent,
        CurrencyDropdownComponent,
        SearchOnSelectComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('expense-tracker.shared', reducer),
    EffectsModule.forFeature(
      [SharedEffects]
    ),
    FormsModule,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    MatDatetimepickerModule,
    NgxMatSelectSearchModule,
  ],
    exports: [
        MaterialModule,
        UnauthenticatedWrapperComponent,
        TextInputComponent,
        PhoneNumberInputComponent,
        NumberInputComponent,
        PasswordInputComponent,
        RadioInputComponent,
        TextAreaInputComponent,
        PrimaryButtonComponent,
        IconComponent,
        DropdownComponent,
        SecondaryButtonComponent,
        CheckboxComponent,
        SearchOnSelectComponent,
        DateFormatPipe,
        DatePickerComponent,
        CurrencyDropdownComponent,
        SearchOnSelectComponent,
    ],
  providers: [
    DatePipe,
    DateFormatPipe,
    PhoneNumberFormatPipe,
  ]
})
export class SharedModule {
}
