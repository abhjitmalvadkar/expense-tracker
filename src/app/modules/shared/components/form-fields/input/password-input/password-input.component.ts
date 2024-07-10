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
import {AbstractControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CommonService} from "../../../../services/common.service";
import {Router} from "@angular/router";
import * as Validation from '../../../../constants/validation.constants'

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['../../styles.css', './password-input.component.css']
})
export class PasswordInputComponent {
  @ViewChild('input') input: ElementRef | undefined;

  @Input() label: string = '';
  @Input() focus: boolean = false;
  @Input() placeholder: string = '';
  @Input() parentFormGroup: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() error: string = '';
  @Input() maxLength: string | number = 20;
  @Input() minLength: string | number = 8;
  @Input() redirectLink: string;
  @Input() displayRedirectLink: boolean = false;
  @Input() displayInfoIcon: boolean = false;
  @Output() checkForErrors = new EventEmitter();

  showPassword = false;
  suffixIcon = 'eye';

  fieldSubscription: Subscription | undefined;

  validation = Validation;

  tooltipText = `Password must contain --
     \n \u2022 Minimum ${this.validation.password.length.min} characters.
     \n \u2022 Maximum ${this.validation.password.length.max} characters.
     \n \u2022 1 lowercase character.
     \n \u2022 1 uppercase character.
     \n \u2022 1 numeric character.
     \n \u2022 1 special character.
     \n \u2022 No spaces.`

  isRequired: boolean = false;
  isDisabled: boolean = false;

  constructor(
    private commonService: CommonService,
    private router: Router
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
    if (this.showPassword) {
      this.suffixIcon = 'eye-closed'
    } else {
      this.suffixIcon = 'eye'
    }
  }

  redirect() {
    this.router.navigate([this.redirectLink])
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
