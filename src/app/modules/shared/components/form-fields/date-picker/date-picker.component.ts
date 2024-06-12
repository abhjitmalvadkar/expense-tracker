import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DatetimeAdapter, MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {MomentDatetimeAdapter} from '@mat-datetimepicker/moment';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Subscription} from "rxjs";
import {CommonService} from "../../../services/common.service";
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['../styles.css', './date-picker.component.css', '../../../../../../styles.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    {
      provide: DatetimeAdapter,
      useClass: MomentDatetimeAdapter
    },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {
        useUtc: false
      }
    },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'L',
          datetimeInput: 'L'
        },
        display: {
          dateInput: 'MM/DD/YYYY',
          datetimeInput: 'MM/DD/YYYY',
          popupHeaderDateLabel: 'ddd, DD MMM'
        }
      }
    }
  ]
})
export class DatePickerComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('input') input: ElementRef | undefined;

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() parentFormGroup: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() error: string = '';
  @Input() focus: boolean = false;
  @Input() inputRestriction: string = '';
  @Input() type: string = '';
  @Input() min: any = moment('01/01/1900', 'L');
  @Input() max: any = moment('12/31/2200', 'L');
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
    this.isDisabled = control?.status === 'DISABLED';
    this.fieldSubscription = control?.valueChanges.subscribe((value) => {

      // Set max value
      if (value?._i?.length > 10 && value?.isAfter(this.max)) {
        this.parentFormGroup.controls[this.controlName].setValue(this.max);
      }

      // Set min value
      if (value?._i?.length > 10 && value?.isBefore(this.min)) {
        this.parentFormGroup.controls[this.controlName].setValue(this.min);
      }

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
    if (control?.validator) {
      const validator = control?.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  ngOnDestroy() {
    this.fieldSubscription?.unsubscribe();
  }
}
