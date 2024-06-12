import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {CommonService} from "../../../../services/common.service";
import {DropdownOption} from "../../../../../../models/dropdown-option.model";

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css', '../../styles.css']
})
export class RadioInputComponent {
  @Input() parentFormGroup: FormGroup;
  @Input() controlName: string;
  @Input() isDisabled: boolean = false;
  @Input() error: string = '';
  @Input() vertical: boolean = false;
  @Input() options: DropdownOption[];
  @Output() checkForErrors = new EventEmitter();

  fieldSubscription: Subscription | undefined;

  isRequired: boolean = false;

  constructor(
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    const control = this.parentFormGroup.controls[this.controlName];
    this.isDisabled = control.status === 'DISABLED';
    this.fieldSubscription = control.valueChanges.subscribe((value) => {
      // If field is marked as touched, mark it as untouched
      if (this.parentFormGroup.controls[this.controlName].touched) {
        this.parentFormGroup.controls[this.controlName].markAsUntouched();
      }

      // Get errors on the form field
      const errors = this.parentFormGroup.controls[this.controlName].errors;

      // If errors exist, handle it
      if (errors) {
        // Clear errors on the form field
        this.parentFormGroup.controls[this.controlName].setErrors(null);

        // Clear out the error messages on the screen (parent component)
        this.checkForErrors.emit(this.controlName);

        // Add errors again to the form field for showing messages in the future
        this.parentFormGroup.controls[this.controlName].setErrors(errors);
      } else {
        // Clear out the error messages on the screen (parent component)
        this.checkForErrors.emit(this.controlName);
      }
    });

    // Check if field is required
    if (control.validator) {
      const validator = control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  ngOnDestroy() {
    this.fieldSubscription?.unsubscribe();
  }
}
