import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['../../styles.css', './text-area-input.component.css']
})
export class TextAreaInputComponent {
  @ViewChild('textarea') input: ElementRef;

  @Input() focus: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() parentFormGroup: FormGroup;
  @Input() controlName: string;
  @Input() error: string;
  @Input() maxLength = '2000';
  @Input() minLength = '100';
  @Output() checkForErrors = new EventEmitter();

  isRequired: boolean = false;
  isDisabled: boolean = false;

  fieldSubscription: Subscription;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  // Do not show field as touched and having error when clicked outside the field
  @HostListener('focusout', ['$event'])
  onBlur(event) {
    if (!this.error) {
      this.parentFormGroup.controls[this.controlName].markAsUntouched();
    }
  }

  ngOnInit(): void {
    const control = this.parentFormGroup?.controls[this.controlName];
    this.isDisabled = control?.status === 'DISABLED';
    this.fieldSubscription = control?.valueChanges?.subscribe(() => {
      // If field is marked as touched, mark it as untouched
      if (this.parentFormGroup?.controls[this.controlName].touched) {
        this.parentFormGroup?.controls[this.controlName]?.markAsUntouched();
      }

      // Get errors on the form field
      const errors = this.parentFormGroup?.controls[this.controlName]?.errors;

      // If errors exist, handle it
      if (errors) {
        // Clear errors on the form field
        this.parentFormGroup?.controls[this.controlName]?.setErrors(null);

        // Clear out the error messages on the screen (parent component)
        this.checkForErrors?.emit(this.controlName);

        // Add errors again to the form field for showing messages in the future
        this.parentFormGroup?.controls[this.controlName]?.setErrors(errors);
      } else {
        // Clear out the error messages on the screen (parent component)
        this.checkForErrors?.emit(this.controlName);
      }
    });

    // Check if field is required
    if (control?.validator) {
      const validator = control?.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  ngOnDestroy() {
    this.fieldSubscription?.unsubscribe();
  }
}
