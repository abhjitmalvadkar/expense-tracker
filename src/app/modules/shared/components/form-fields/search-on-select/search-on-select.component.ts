import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormGroup} from "@angular/forms";
import {DropdownOption} from "../../../../../models/dropdown-option.model";
import {CommonService} from "../../../services/common.service";

export interface Bank {
  id: string;
  name: string;
}

@Component({
  selector: 'app-search-on-select',
  templateUrl: './search-on-select.component.html',
  styleUrls: ['../styles.css', './search-on-select.component.css']
})
export class SearchOnSelectComponent implements AfterViewChecked {

  @ViewChild('select') input: ElementRef | undefined;

  @Input() label: string = '';
  @Input() options: DropdownOption[] = [];
  @Input() enableClearSelection: boolean = false;
  @Input() parentFormGroup: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() filterControlName: string = '';
  @Input() error: string = '';
  @Input() placeholder: string = '';
  @Input() searchPlaceholder: string = 'Search';
  @Input() focus: boolean = false;
  @Input() enableMultiple: boolean = false;
  @Input() optionsPanelClassName: string = '';
  @Input() type: string = '';
  @Input() hasNext: boolean;
  @Input() hasPrev: boolean;
  @Input() loading = false;
  @Output() onNextPage = new EventEmitter();
  @Output() onPrevPage = new EventEmitter();
  @Output() checkForErrors: EventEmitter<any> = new EventEmitter();
  @Output() onClearSelection: EventEmitter<any> = new EventEmitter();

  fieldSubscription: Subscription | undefined;

  isRequired: boolean = false;
  isDisabled: boolean = false;
  isPrevLoader: boolean = false;
  isNextLoader: boolean = false;

  throttle = 300;
  scrollDistance = 0.01;
  scrollUpDistance = 0.01;

  constructor(
    private commonService: CommonService,
    private readonly changeDetectorRef: ChangeDetectorRef
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

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
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
    this.parentFormGroup.controls[this.controlName].setValue('');
    this.parentFormGroup.markAsDirty();
    this.onClearSelection.emit(true);
  }

  getNext() {
    if (this.loading || !this.hasNext) {
      return;
    }
    this.isNextLoader = true;
    this.onNextPage.emit();
  }

  getPrev() {
    if (this.loading || !this.hasPrev) {
      return;
    }
    this.isPrevLoader = true;
    this.onPrevPage.emit();
  }

  ngOnDestroy() {
    this.fieldSubscription?.unsubscribe();
  }

}
