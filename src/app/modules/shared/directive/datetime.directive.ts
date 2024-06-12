import { Directive, ElementRef, HostListener } from "@angular/core";
import { DatetimeFormatPipe } from "../pipes/datetime-format.pipe";

@Directive({
  selector: '[datetime]'
})
export class DatetimeDirective {
  inputElement: HTMLInputElement;
  aRegex = RegExp('[apm]');
  numericRegex = RegExp('[0-9]');
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  constructor(public el: ElementRef,
    private datetimeFormatPipe: DatetimeFormatPipe) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e): any {
    const value = e.target.value;

    if (e.keyCode === 8) {
      if (
        value.length === 3 ||
        value.length === 6 ||
        value.length === 15
      ) {
        e.target.value = value.slice(0, -1);
      }

      if (
        value.length === 12 ||
        value.length === 20
      ) {
        e.target.value = value.slice(0, -2);
      }
    }

    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    if (value.length < 17 && !this.numericRegex.test(e.key)) {
      e.preventDefault();
      return;
    }

    if (value.length >= 17 && !this.aRegex.test(e.key)) {
      e.preventDefault();
      return;
    }

    if (value.length >= 20) {
      e.preventDefault();
      return;
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e): any {
    e.target.value = this.datetimeFormatPipe.transform(e.target.value, true);
  }

  @HostListener('blur', ['$event'])
  onBlur(e): any {
    e.target.value = this.datetimeFormatPipe.transform(e.target.value);
  }

  @HostListener('paste', ['$event'])
  onPaste(e): any {
    let pastedInput: string;
    // @ts-ignore
    if (window.clipboardData) {
      // Browser is IE
      // @ts-ignore
      pastedInput = window.clipboardData.getData('text');
    } else if (e.clipboardData && e.clipboardData.getData) {
      // Other browsers
      pastedInput = e.clipboardData.getData('text/plain');
    }
    e.target.value = this.datetimeFormatPipe.transform(pastedInput, true);
  }
}
