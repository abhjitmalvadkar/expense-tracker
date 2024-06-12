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
import {CommonService} from "../../../../services/common.service";

@Component({
  selector: 'app-phone-number-input',
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['../../styles.css', './phone-number-input.component.css']
})
export class PhoneNumberInputComponent {
  @ViewChild('input') input: ElementRef | undefined;

  @Input() label: string = '';
  @Input() focus: boolean = false;
  @Input() placeholder: string = '';
  @Input() parentFormGroup: FormGroup = new FormGroup<any>({});
  @Input() controlName: string = '';
  @Input() error: string = '';
  @Output() checkForErrors = new EventEmitter();

  fieldSubscription: Subscription | undefined;

  isRequired: boolean = false;
  isDisabled: boolean = false;

  constructor(
    private commonService: CommonService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['focus']?.currentValue) {
      const clientArea = $('#client_area');
      const y = clientArea.scrollTop() +
        this.input?.nativeElement.getBoundingClientRect().top -
        this.commonService.headerRemOffsetCalculator()

      clientArea.scrollTop(y);
    }
  }

  // Do not show field as touched and having error when clicked outside the field
  @HostListener('focusout', ['$event'])
  onBlur(event: Event) {
    if (!this.error) {
      this.parentFormGroup.controls[this.controlName].markAsUntouched();
    }
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
