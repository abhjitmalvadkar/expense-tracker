import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../../../state/app.state";
import {Subject, Subscription, takeUntil} from "rxjs";
import {screenType} from "../../../../core/shared.selectors";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../../styles.css', './checkbox.component.css']
})
export class CheckboxComponent {
  private readonly onDestroy: Subject<any> = new Subject<any>();

  list: any;

  @Input() parentFormGroup: FormGroup = new FormGroup<any>({});
  @Input() controlName: string = '';
  @Input() options: {key: string | number, value: string, label?: string}[] = [];
  @Input() columnCount: number = 1;
  @Input() error: string = '';
  @Output() checkForErrors = new EventEmitter();

  columnsToDisplay: number;

  fieldSubscription: Subscription | undefined;

  isRequired: boolean = false;
  isDisabled: boolean = false;


  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.store.select(screenType)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (data === 'mobile') {
          this.columnsToDisplay = 1
        } else {
          this.columnsToDisplay = this.columnCount;
        }
      });

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
      const validator = control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  update(checked: boolean, value: string | number) {
    const oldValue = this.parentFormGroup.controls[this.controlName].value || [];
    if (!checked)
      this.parentFormGroup.controls[this.controlName].setValue(
        oldValue.filter((x: string | number) => x != value)
      );
    else
      this.parentFormGroup.controls[this.controlName].setValue(
        this.options
          .filter(
            (x: any) => x.key == value || oldValue.indexOf(x.key) >= 0
          )
          .map((x) => x.key)
      );
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
