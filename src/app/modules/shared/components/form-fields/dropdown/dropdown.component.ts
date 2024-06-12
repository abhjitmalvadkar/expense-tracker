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
import {DropdownOption} from "../../../../../models/dropdown-option.model";
import {CommonService} from "../../../services/common.service";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['../styles.css', './dropdown.component.css']
})
export class DropdownComponent {
  @ViewChild('select') input: ElementRef | undefined;

  @Input() loading: boolean = false;
  @Input() label: string = '';
  @Input() options: DropdownOption[] = [];
  @Input() enableClearSelection: boolean = false;
  @Input() parentFormGroup: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() error: string = '';
  @Input() placeholder: string = '';
  @Input() focus: boolean = false;
  @Input() enableMultiple: boolean = false;
  @Input() optionsPanelClassName: string = '';
  @Input() selectAllValue: string = '';


  @Output() checkForErrors: EventEmitter<any> = new EventEmitter();

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
  onBlur(event: any) {
    if (!this.error) {
      this.parentFormGroup?.controls[this.controlName].markAsUntouched();
    }
  }

  ngOnInit(): void {
    const control = this.parentFormGroup.controls[this.controlName];
    this.isDisabled = control?.status === 'DISABLED';
    this.fieldSubscription = control?.valueChanges.subscribe((value) => {

      // If field is marked as touched, mark it as untouched
      if (this.parentFormGroup?.controls[this.controlName].touched) {
        this.parentFormGroup?.controls[this.controlName].markAsUntouched();
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
    if (control?.validator) {
      const validator = control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  clearSelection($event: Event) {
    $event.stopPropagation();
    this.parentFormGroup.controls[this.controlName].setValue(this.enableMultiple ? [] : '');
    this.parentFormGroup.markAsDirty();
  }

  isChecked(): boolean {
    return this.parentFormGroup.controls[this.controlName].value &&
           this.options.length &&
           this.parentFormGroup.controls[this.controlName].value.length === this.options.length;
  }

  isIndeterminate(): boolean {
    const control = this.parentFormGroup.controls[this.controlName];

    return !!(Array.isArray(control.value) &&
              control.value?.length &&
              (control.value?.length < this.options?.length));
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.parentFormGroup.controls[this.controlName].setValue(this.options.map(o => o.key));
    } else {
      this.parentFormGroup.controls[this.controlName].setValue([]);
    }
  }

  ngOnDestroy() {
    this.fieldSubscription?.unsubscribe();
  }

}
